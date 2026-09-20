'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { PortalAuthButton } from '@/features/portal/components/portal-auth-button';
import { PortalAuthLogo } from '@/features/portal/components/portal-auth-logo';
import { PortalAuthShell } from '@/features/portal/components/portal-auth-shell';
import { bootstrapPortalProfile } from '@/features/portal/api/bootstrap-profile';
import { toPublicAuthError } from '@/lib/auth/public-auth-error';
import { portalAbsoluteUrl } from '@/lib/portal-url';
import { createClient } from '@/lib/supabase/browser';

const fieldClassName =
  'h-12 rounded-lg border-[#E5E7EB] bg-white px-4 text-[15px] text-[#2A2A2A] shadow-none placeholder:text-[#9CA3AF] focus-visible:border-[#3C5142] focus-visible:ring-[#3C5142]/20';

const labelClassName = 'text-[13px] font-normal text-[#9CA3AF]';

const otpSlotClassName =
  'h-11 w-8 border-[#E5E7EB] text-[16px] text-[#111827] sm:w-9 data-[active=true]:border-[#3C5142] data-[active=true]:ring-[#3C5142]/20';

export function PortalVerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(() => searchParams.get('email')?.trim() ?? '');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const verifyingRef = useRef(false);

  async function verifyCode(token: string) {
    if (verifyingRef.current) return;

    const normalizedEmail = email.trim();
    const normalizedToken = token.replace(/\s/g, '');

    if (!normalizedEmail) {
      setError('Enter the email you used to create the account.');
      return;
    }

    if (normalizedToken.length !== 8) {
      setError('Enter the 8-digit verification code from your email.');
      return;
    }

    setError(null);
    setInfo(null);
    verifyingRef.current = true;
    setIsLoading(true);

    const supabase = createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: normalizedEmail,
      token: normalizedToken,
      type: 'signup'
    });

    if (verifyError) {
      verifyingRef.current = false;
      setIsLoading(false);
      setError(toPublicAuthError(verifyError, 'That code is invalid or has expired.'));
      return;
    }

    try {
      await bootstrapPortalProfile();
    } catch (bootstrapError) {
      verifyingRef.current = false;
      setIsLoading(false);
      setError(
        toPublicAuthError(
          bootstrapError,
          'Email verified but profile setup failed. Try signing in.'
        )
      );
      return;
    }

    setIsLoading(false);
    router.push('/portal');
    router.refresh();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await verifyCode(code);
  }

  async function handleResend() {
    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setError('Enter the email you used to create the account.');
      return;
    }

    setError(null);
    setInfo(null);
    setIsResending(true);

    const supabase = createClient();
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: normalizedEmail,
      options: {
        emailRedirectTo: portalAbsoluteUrl('/auth/confirm?next=/portal')
      }
    });

    setIsResending(false);

    if (resendError) {
      setError(toPublicAuthError(resendError, 'Unable to resend the code right now.'));
      return;
    }

    setInfo('A new verification code has been sent.');
  }

  return (
    <PortalAuthShell>
      <div className='mx-auto w-full max-w-[360px]'>
        <PortalAuthLogo />

        <div className='mb-8 text-center'>
          <h1 className='text-[28px] font-semibold tracking-tight text-[#111827]'>
            Verify your email
          </h1>
          <p className='mt-2 text-[15px] leading-relaxed text-[#6B7280]'>
            Enter the 8-digit code we sent to finish creating your account.
          </p>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label className={labelClassName} htmlFor='email'>
              Email
            </Label>
            <Input
              autoComplete='email'
              className={fieldClassName}
              id='email'
              onChange={(event) => setEmail(event.target.value)}
              placeholder='user@email.com'
              required
              type='email'
              value={email}
            />
          </div>

          <div className='space-y-2'>
            <Label className={labelClassName} htmlFor='verification-code'>
              Verification code
            </Label>
            <div className='flex justify-center pt-1'>
              <InputOTP
                id='verification-code'
                maxLength={8}
                onChange={setCode}
                onComplete={(value) => {
                  void verifyCode(value);
                }}
                value={code}
              >
                <InputOTPGroup>
                  <InputOTPSlot className={otpSlotClassName} index={0} />
                  <InputOTPSlot className={otpSlotClassName} index={1} />
                  <InputOTPSlot className={otpSlotClassName} index={2} />
                  <InputOTPSlot className={otpSlotClassName} index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot className={otpSlotClassName} index={4} />
                  <InputOTPSlot className={otpSlotClassName} index={5} />
                  <InputOTPSlot className={otpSlotClassName} index={6} />
                  <InputOTPSlot className={otpSlotClassName} index={7} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {info ? <p className='text-[14px] text-[#3C5142]'>{info}</p> : null}
          {error ? <p className='text-[14px] text-red-600'>{error}</p> : null}

          <PortalAuthButton isLoading={isLoading} type='submit'>
            Verify and continue
          </PortalAuthButton>
        </form>

        <p className='mt-6 text-center text-[14px] text-[#6B7280]'>
          Didn&apos;t get a code?{' '}
          <button
            className='font-medium text-[#3C5142] hover:underline disabled:opacity-60'
            disabled={isResending || isLoading}
            onClick={() => {
              void handleResend();
            }}
            type='button'
          >
            {isResending ? 'Sending…' : 'Resend code'}
          </button>
        </p>

        <p className='mt-4 text-center text-[15px] text-[#6B7280]'>
          <Link className='font-medium text-[#3C5142] hover:underline' href='/portal/login'>
            Back to login
          </Link>
        </p>
      </div>
    </PortalAuthShell>
  );
}
