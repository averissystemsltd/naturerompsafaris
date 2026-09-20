import { z } from 'zod';

export const portalSignUpSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .email('Enter a valid email address.')
    .max(254, 'Email address is too long.'),
  fullName: z
    .string()
    .trim()
    .min(2, 'Enter your full name.')
    .max(80, 'Name is too long.')
    .regex(/[\p{L}]/u, 'Enter your full name.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(72, 'Password is too long.')
});

export type PortalSignUpValues = z.infer<typeof portalSignUpSchema>;
