const FALLBACK_SIGNUP_ERROR =
  'Unable to create this account right now. Check your details and try again.';

const CODE_MESSAGES: Record<string, string> = {
  email_exists: 'If this email can be used, check your inbox for the next step.',
  email_not_confirmed: 'Confirm your email before signing in.',
  invalid_credentials: 'Email or password is incorrect.',
  over_email_send_rate_limit: 'Please wait a moment before trying again.',
  same_password: 'Choose a password you have not used before.',
  signup_disabled: 'Account creation is currently unavailable.',
  unexpected_failure: 'We could not send the verification email. Please try again shortly.',
  user_already_exists: 'If this email can be used, check your inbox for the next step.',
  validation_failed: 'Check your details and try again.',
  weak_password: 'Choose a stronger password with at least 8 characters.'
};

function extractAuthMessage(error: unknown): string {
  if (!error) return '';
  if (typeof error === 'string') return error.trim();

  if (typeof error === 'object') {
    const candidate = error as {
      error_description?: unknown;
      message?: unknown;
      msg?: unknown;
    };

    if (typeof candidate.message === 'string') return candidate.message.trim();
    if (typeof candidate.error_description === 'string') {
      return candidate.error_description.trim();
    }
    if (typeof candidate.msg === 'string') return candidate.msg.trim();
  }

  return '';
}

function looksLikeRawPayload(message: string): boolean {
  const trimmed = message.trim();
  if (!trimmed) return true;
  if (trimmed === '{}' || trimmed === '{ }' || trimmed === '[]') return true;

  if (/^[[{]/.test(trimmed)) {
    try {
      JSON.parse(trimmed);
      return true;
    } catch {
      return /^\{[\s]*\}$/.test(trimmed);
    }
  }

  return /database error|42501|not allowed to create|smtp|json object|internal server error/i.test(
    trimmed
  );
}

export function toPublicAuthError(error: unknown, fallback = FALLBACK_SIGNUP_ERROR): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === 'string' && CODE_MESSAGES[code]) {
      return CODE_MESSAGES[code];
    }
  }

  const message = extractAuthMessage(error);

  if (looksLikeRawPayload(message)) {
    return fallback;
  }

  if (/error sending|mailer|smtp|confirmation email|incorrect authentication/i.test(message)) {
    return 'We could not send the verification email. Please try again shortly.';
  }

  return message;
}
