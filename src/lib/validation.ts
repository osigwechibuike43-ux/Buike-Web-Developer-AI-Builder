export interface ContactValues {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const LIMITS = { name: 80, email: 120, message: 2000, minMessage: 20 } as const;

// Pragmatic email check; the server re-validates.
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const message = v.message.trim();

  if (!name) errors.name = 'Please tell me your name.';
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = 'Please enter your email address.';
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = 'That email address looks incomplete.';

  if (!v.projectType) errors.projectType = 'Choose what you would like to build.';

  if (!message) errors.message = 'Tell me a little about your project.';
  else if (message.length < LIMITS.minMessage) errors.message = `Add a few more details (at least ${LIMITS.minMessage} characters).`;
  else if (message.length > LIMITS.message) errors.message = `Keep your message under ${LIMITS.message} characters.`;

  return errors;
}
