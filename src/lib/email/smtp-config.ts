export type SmtpMailbox = 'enquiry' | 'guest' | 'newsletter';

const MAILBOX_USERS: Record<SmtpMailbox, string> = {
  enquiry: 'inquiries@naturerompsafaris.com',
  guest: 'no-reply@naturerompsafaris.com',
  newsletter: 'news@naturerompsafaris.com'
};

const MAILBOX_FROM: Record<SmtpMailbox, string> = {
  enquiry: 'Nature Romp Safaris <inquiries@naturerompsafaris.com>',
  guest: 'Nature Romp Safaris <no-reply@naturerompsafaris.com>',
  newsletter: 'Nature Romp Safaris <news@naturerompsafaris.com>'
};

export function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST?.trim() && process.env.SMTP_PASSWORD?.trim());
}

export function smtpAuthUser(mailbox: SmtpMailbox) {
  const envKey = {
    enquiry: 'SMTP_ENQUIRY_USER',
    guest: 'SMTP_GUEST_USER',
    newsletter: 'SMTP_NEWSLETTER_USER'
  }[mailbox];

  return process.env[envKey]?.trim() || MAILBOX_USERS[mailbox];
}

export function smtpFromAddress(mailbox: SmtpMailbox) {
  const envKey = {
    enquiry: 'SMTP_ENQUIRY_FROM',
    guest: 'SMTP_GUEST_FROM',
    newsletter: 'SMTP_NEWSLETTER_FROM'
  }[mailbox];

  return process.env[envKey]?.trim() || MAILBOX_FROM[mailbox];
}

/**
 * Per-mailbox SMTP password. Each mailbox (inquiries@, no-reply@, news@) can
 * authenticate with its own password; falls back to the shared SMTP_PASSWORD
 * when a mailbox-specific one is not set.
 */
export function smtpAuthPassword(mailbox: SmtpMailbox) {
  const envKey = {
    enquiry: 'SMTP_ENQUIRY_PASSWORD',
    guest: 'SMTP_GUEST_PASSWORD',
    newsletter: 'SMTP_NEWSLETTER_PASSWORD'
  }[mailbox];

  return process.env[envKey]?.trim() || process.env.SMTP_PASSWORD?.trim() || '';
}

export function enquiryNotificationEmail() {
  return (
    process.env.ENQUIRY_NOTIFICATION_EMAIL?.trim() ||
    process.env.BRAND_ENQUIRY_EMAIL?.trim() ||
    'info@naturerompsafaris.com'
  );
}

export function enquiryReplyToEmail() {
  return process.env.ENQUIRY_REPLY_TO?.trim() || enquiryNotificationEmail();
}

/** Optional CC recipient(s) for internal enquiry notifications (comma-separated). */
export function enquiryCcEmails(): string[] {
  return (process.env.ENQUIRY_CC_EMAIL?.trim() || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}
