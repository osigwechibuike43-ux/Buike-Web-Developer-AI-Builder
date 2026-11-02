/**
 * Vercel Function: POST /api/contact
 * Validates the enquiry and delivers it through Resend.
 *
 * Env vars: RESEND_API_KEY (required), CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 * Without RESEND_API_KEY it answers 503 and the site falls back to email / WhatsApp links.
 */

const LIMITS = { name: 80, email: 120, projectType: 80, message: 2000, minMessage: 20 };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const ALLOWED_TYPES = [
  'Website or web application',
  'Business website',
  'E-commerce store',
  'Landing page',
  'AI-powered product',
  'Something else',
];

// Best-effort per-instance rate limit (5 messages / hour / IP). Use a shared store for hard guarantees.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 2000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return false;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, ' ').trim();
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(request: Request): Promise<Response> {
  // Same-origin only.
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) return json({ error: 'forbidden' }, 403);
    } catch {
      return json({ error: 'forbidden' }, 403);
    }
  }

  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 10_000) return json({ error: 'too_large' }, 413);
    data = JSON.parse(raw);
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // Honeypot: pretend success so bots learn nothing.
  if (typeof data.company === 'string' && data.company.trim() !== '') return json({ ok: true });

  const name = oneLine(String(data.name ?? ''));
  const email = oneLine(String(data.email ?? ''));
  const projectType = oneLine(String(data.projectType ?? ''));
  const message = String(data.message ?? '').replace(/\r\n/g, '\n').trim();

  const fields: Record<string, string> = {};
  if (!name || name.length > LIMITS.name) fields.name = 'Please enter your name.';
  if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) fields.email = 'Please enter a valid email address.';
  if (!ALLOWED_TYPES.includes(projectType) || projectType.length > LIMITS.projectType) fields.projectType = 'Choose what you would like to build.';
  if (message.length < LIMITS.minMessage || message.length > LIMITS.message) fields.message = `Message must be ${LIMITS.minMessage}-${LIMITS.message} characters.`;
  if (Object.keys(fields).length) return json({ error: 'validation', fields }, 422);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ error: 'not_configured' }, 503);

  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return json({ error: 'rate_limited' }, 429);

  const to = process.env.CONTACT_TO_EMAIL ?? 'buikedev27@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Buike Portfolio <onboarding@resend.dev>';

  const html = `<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#14120f">
<h2 style="margin:0 0 12px">New portfolio enquiry</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Project:</strong> ${escapeHtml(projectType)}</p>
<p style="white-space:pre-wrap;border-left:3px solid #e4470f;padding-left:12px">${escapeHtml(message)}</p></div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry: ${projectType} from ${name}`.slice(0, 200),
        text: `Name: ${name}\nEmail: ${email}\nProject: ${projectType}\n\n${message}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text().catch(() => ''));
      return json({ error: 'delivery_failed' }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('Contact delivery failed', err);
    return json({ error: 'delivery_failed' }, 502);
  }
}
