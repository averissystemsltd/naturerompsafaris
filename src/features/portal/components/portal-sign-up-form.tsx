'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PortalAuthButton } from '@/features/portal/components/portal-auth-button';
import { PortalAuthLogo } from '@/features/portal/components/portal-auth-logo';
import { PortalAuthShell } from '@/features/portal/components/portal-auth-shell';
import { bootstrapPortalProfile } from '@/features/portal/api/bootstrap-profile';
import { portalSignUpSchema } from '@/features/portal/schemas/sign-up';
import { toPublicAuthError } from '@/lib/auth/public-auth-error';
import { isAllowedPortalSignupEmail, portalSignupDeniedMessage } from '@/lib/auth/signup-allowlist';
import { portalAbsoluteUrl } from '@/lib/portal-url';
import { createClient } from '@/lib/supabase/browser';
import { cn } from '@/lib/utils';

const fieldClassName =
  'h-12 rounded-lg border-[#E5E7EB] bg-white px-4 text-[15px] text-[#2A2A2A] shadow-none placeholder:text-[#9CA3AF] focus-visible:border-[#3C5142] focus-visible:ring-[#3C5142]/20';

const invalidFieldClassName =
  'border-red-300 focus-visible:border-red-500 focus-visible:ring-red-500/20';

const labelClassName = 'text-[13px] font-normal text-[#9CA3AF]';

type FieldErrors = {
  email?: string;
  fullName?: string;
  password?: string;
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p className='text-[13px] text-red-600' id={id}>
      {message}
    </p>
  );
}

export function PortalSignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    const parsed = portalSignUpSchema.safeParse({ email, fullName, password });

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === 'fullName' || field === 'email' || field === 'password') {
          nextErrors[field] ??= issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    if (!isAllowedPortalSignupEmail(parsed.data.email)) {
      setError(portalSignupDeniedMessage());
      return;
    }

    setIsLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: { full_name: parsed.data.fullName },
        emailRedirectTo: portalAbsoluteUrl('/auth/confirm?next=/portal')
      }
    });

    if (signUpError) {
      setIsLoading(false);
      const blocked = /not allowed|42501/i.test(signUpError.message);
      setError(blocked ? portalSignupDeniedMessage() : toPublicAuthError(signUpError));
      return;
    }

    if (data.session) {
      try {
        await bootstrapPortalProfile();
      } catch (bootstrapError) {
        setIsLoading(false);
        setError(toPublicAuthError(bootstrapError, 'Account created but profile setup failed.'));
        return;
      }

      setIsLoading(false);
      router.push('/portal');
      router.refresh();
      return;
    }

    setIsLoading(false);
    router.push(`/portal/login/verify?email=${encodeURIComponent(parsed.data.email)}`);
  }

  return (
    <PortalAuthShell>
      <div className='mx-auto w-full max-w-[360px]'>
        <PortalAuthLogo />

        <div className='mb-8 text-center'>
          <h1 className='text-[28px] font-semibold tracking-tight text-[#111827]'>
            Create account
          </h1>
          <p className='mt-2 text-[15px] text-[#6B7280]'>
            Already have an account?{' '}
            <Link className='font-medium text-[#3C5142] hover:underline' href='/portal/login'>
              Sign in
            </Link>
          </p>
        </div>

        <form className='space-y-5' noValidate onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label className={labelClassName} htmlFor='full-name'>
              Full name
            </Label>
            <Input
              aria-describedby={fieldErrors.fullName ? 'full-name-error' : undefined}
              aria-invalid={Boolean(fieldErrors.fullName)}
              autoComplete='name'
              className={cn(fieldClassName, fieldErrors.fullName && invalidFieldClassName)}
              id='full-name'
              maxLength={80}
              name='fullName'
              onChange={(event) => {
                setFullName(event.target.value);
                if (fieldErrors.fullName) {
                  setFieldErrors((current) => ({ ...current, fullName: undefined }));
                }
              }}
              placeholder='Jane Safari Guide'
              required
              value={fullName}
            />
            <FieldError id='full-name-error' message={fieldErrors.fullName} />
          </div>

          <div className='space-y-2'>
            <Label className={labelClassName} htmlFor='email'>
              Enter email id
            </Label>
            <Input
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              aria-invalid={Boolean(fieldErrors.email)}
              autoComplete='email'
              className={cn(fieldClassName, fieldErrors.email && invalidFieldClassName)}
              id='email'
              maxLength={254}
              name='email'
              onChange={(event) => {
                setEmail(event.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((current) => ({ ...current, email: undefined }));
                }
              }}
              placeholder='user@email.com'
              required
              type='email'
              value={email}
            />
            <FieldError id='email-error' message={fieldErrors.email} />
          </div>

          <div className='space-y-2'>
            <Label className={labelClassName} htmlFor='password'>
              Enter password
            </Label>
            <div className='relative'>
              <Input
                aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                aria-invalid={Boolean(fieldErrors.password)}
                autoComplete='new-password'
                className={cn(
                  fieldClassName,
                  'pr-12',
                  fieldErrors.password && invalidFieldClassName
                )}
                id='password'
                maxLength={72}
                minLength={8}
                name='password'
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors((current) => ({ ...current, password: undefined }));
                  }
                }}
                placeholder='••••••••'
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
              />
              <button
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className='text-[#9CA3AF] hover:text-[#6B7280] absolute inset-y-0 right-0 flex items-center px-4'
                onClick={() => setShowPassword((current) => !current)}
                type='button'
              >
                {showPassword ? (
                  <Icons.eyeOff className='size-5' />
                ) : (
                  <Icons.eye className='size-5' />
                )}
              </button>
            </div>
            <FieldError id='password-error' message={fieldErrors.password} />
          </div>

          {error ? (
            <p className='text-[14px] text-red-600' role='alert'>
              {error}
            </p>
          ) : null}

          <PortalAuthButton isLoading={isLoading} type='submit'>
            Create account
          </PortalAuthButton>
        </form>
      </div>
    </PortalAuthShell>
  );
}
