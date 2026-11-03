import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { SITE, SOCIALS } from '@/data/site';
import { SERVICES } from '@/data/content';
import { LIMITS, validateContact, type ContactErrors, type ContactValues } from '@/lib/validation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowUpRight, Check, Copy, Mail, SocialIcon } from '@/components/ui/Icons';
import { PREFILL_EVENT } from './Services';

type Status = 'idle' | 'sending' | 'sent' | 'unavailable' | 'error';

const OTHER = 'Something else';
const PROJECT_TYPES = [...SERVICES.map((s) => s.projectType), OTHER];
const EMPTY: ContactValues = { name: '', email: '', projectType: '', message: '' };

function Field({ id, label, error, children, hint }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-3">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-[#c0261b] dark:text-[#ff8a7a]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const uid = useId();
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const id = (k: string) => `${uid}-${k}`;

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (PROJECT_TYPES.includes(detail)) setValues((v) => ({ ...v, projectType: detail }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (status !== 'idle' && status !== 'sending') resultRef.current?.focus();
  }, [status]);

  const set = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const mailto = () =>
    `mailto:${SITE.email}?subject=${encodeURIComponent(`Project enquiry: ${values.projectType || 'Website'}`)}&body=${encodeURIComponent(`Hi Buike,\n\n${values.message}\n\n${values.name}\n${values.email}`)}`;
  const whatsapp = () =>
    `${SITE.whatsapp}?text=${encodeURIComponent(`Hi Buike, I'm ${values.name}. I'd like to talk about a ${values.projectType || 'project'}.\n\n${values.message}`)}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = (['name', 'email', 'projectType', 'message'] as const).find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: honeypot.current?.value ?? '' }),
      });
      if (res.ok) {
        setStatus('sent');
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: string; fields?: ContactErrors } | null;
      if (res.status === 422 && data?.fields) {
        setErrors(data.fields);
        setStatus('idle');
        return;
      }
      if (res.status === 429) {
        setServerMessage('You have sent a few messages already. Please try again later, or reach me directly below.');
        setStatus('error');
        return;
      }
      // 404 (no function in local dev), 503 (not configured) or any other failure: offer direct routes.
      setStatus('unavailable');
    } catch {
      setStatus('unavailable');
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  }

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
    setServerMessage('');
  };

  const describedBy = (k: keyof ContactValues, hint = false) =>
    [errors[k] ? `${id(k)}-error` : null, hint && !errors[k] ? `${id(k)}-hint` : null].filter(Boolean).join(' ') || undefined;

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          index="08"
          label="Contact"
          title={
            <>
              Got a project? <span className="accent-serif text-accent-text">Let’s build it right.</span>
            </>
          }
          intro="Tell me what you’re working on. I’ll read every message and get back to you as soon as I can. WhatsApp is usually quickest."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="card p-6 sm:p-9">
              {status === 'sent' ? (
                <div ref={resultRef} tabIndex={-1} role="status" className="py-8 text-center outline-none">
                  <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="h-display text-4xl">Message sent.</h3>
                  <p className="mx-auto mt-3 max-w-md text-ink-2">Thanks, {values.name.split(' ')[0]}. I’ll reply to {values.email} soon.</p>
                  <button type="button" onClick={reset} className="btn btn-ghost mt-8">
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={status === 'unavailable' || status === 'error' ? id('result') : undefined}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id={id('name')} label="Your name" error={errors.name}>
                      <input
                        id={id('name')}
                        name="name"
                        className="field"
                        autoComplete="name"
                        maxLength={LIMITS.name}
                        value={values.name}
                        onChange={(e) => set('name', e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={describedBy('name')}
                        required
                      />
                    </Field>
                    <Field id={id('email')} label="Email address" error={errors.email}>
                      <input
                        id={id('email')}
                        name="email"
                        type="email"
                        inputMode="email"
                        className="field"
                        autoComplete="email"
                        maxLength={LIMITS.email}
                        value={values.email}
                        onChange={(e) => set('email', e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={describedBy('email')}
                        required
                      />
                    </Field>
                  </div>

                  <div className="mt-6">
                    <Field id={id('projectType')} label="What would you like to build?" error={errors.projectType}>
                      <select
                        id={id('projectType')}
                        name="projectType"
                        className="field"
                        value={values.projectType}
                        onChange={(e) => set('projectType', e.target.value)}
                        aria-invalid={!!errors.projectType}
                        aria-describedby={describedBy('projectType')}
                        required
                      >
                        <option value="" disabled>
                          Choose one
                        </option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="mt-6">
                    <Field id={id('message')} label="Tell me about it" error={errors.message} hint={`${values.message.trim().length}/${LIMITS.message} characters`}>
                      <textarea
                        id={id('message')}
                        name="message"
                        rows={6}
                        className="field resize-y"
                        maxLength={LIMITS.message}
                        placeholder="What are you building, who is it for, and when would you like it live?"
                        value={values.message}
                        onChange={(e) => set('message', e.target.value)}
                        aria-invalid={!!errors.message}
                        aria-describedby={describedBy('message', true)}
                        required
                      />
                    </Field>
                  </div>

                  {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Company
                      <input ref={honeypot} name="company" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <div id={id('result')} ref={status === 'unavailable' || status === 'error' ? resultRef : undefined} tabIndex={-1} role="alert" className="outline-none">
                    {status === 'unavailable' && (
                      <div className="mt-6 rounded-xl border border-line-strong bg-bg-2 p-5">
                        <p className="font-semibold">I couldn’t send that from here.</p>
                        <p className="mt-1 text-ink-2">Your message is still in the form. Send it directly instead:</p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <a href={mailto()} className="btn btn-primary !min-h-11 !px-5 !text-sm">
                            <Mail className="h-4 w-4" /> Open in email
                          </a>
                          <a href={whatsapp()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !px-5 !text-sm">
                            <SocialIcon id="whatsapp" className="h-4 w-4" /> Send on WhatsApp
                            <span className="sr-only">(opens in a new tab)</span>
                          </a>
                        </div>
                      </div>
                    )}
                    {status === 'error' && <p className="mt-6 rounded-xl border border-line-strong bg-bg-2 p-5 text-ink-2">{serverMessage}</p>}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button type="submit" className="btn btn-primary disabled:opacity-60" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                      {status === 'sending' ? (
                        <>
                          <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> Sending…
                        </>
                      ) : (
                        <>
                          Send message <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <p className="text-sm text-ink-3">Your details are only used to reply to you.</p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="space-y-4">
              <div className="card flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow">Email</p>
                    <a href={`mailto:${SITE.email}`} className="block truncate font-medium hover:text-accent-text">
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <button type="button" onClick={copyEmail} aria-label={copied ? 'Email address copied' : 'Copy email address'} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong hover:bg-ink hover:text-bg">
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
                <span role="status" className="sr-only">{copied ? 'Email address copied to clipboard' : ''}</span>
              </div>

              {SOCIALS.map((s) => (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" style={{ '--brand': s.brand } as React.CSSProperties} className="card group flex items-center justify-between gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-[0_14px_30px_-20px_var(--brand)]">
                  <span className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-[var(--brand)] group-hover:bg-[var(--brand)] group-hover:text-white">
                      <SocialIcon id={s.id} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{s.label}</span>
                      <span className="font-mono text-xs text-ink-3">{s.hint}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}

              <p className="px-1 pt-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-3">
                {SITE.location} · {SITE.timezone}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
