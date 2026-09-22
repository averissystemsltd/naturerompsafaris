import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { getPortalSession } from '@/lib/auth/portal';
import {
  saveContact,
  saveGeneralBranding,
  saveNotifications,
  saveSeoAnalytics,
  saveSocial
} from '@/features/portal/cms/settings/settings-actions';
import type {
  ContactValues,
  GeneralBrandingValues,
  NotificationsValues,
  SeoAnalyticsValues,
  SocialValues
} from '@/features/portal/cms/settings/schema';

const TABS = ['general', 'contact', 'social', 'notifications', 'seo'] as const;
type SettingsTab = (typeof TABS)[number];

function isSettingsTab(value: unknown): value is SettingsTab {
  return typeof value === 'string' && TABS.includes(value as SettingsTab);
}

export async function POST(request: Request) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ error: 'Sign in again to save settings.' }, { status: 401 });
  }
  if (session.role !== 'admin' && session.role !== 'owner') {
    return NextResponse.json({ error: 'Only admins can change site settings.' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid settings payload.' }, { status: 400 });
  }

  const tab = body && typeof body === 'object' ? (body as { tab?: unknown }).tab : null;
  const values = body && typeof body === 'object' ? (body as { values?: unknown }).values : null;

  if (!isSettingsTab(tab) || values == null || typeof values !== 'object') {
    return NextResponse.json({ error: 'Unknown settings tab.' }, { status: 400 });
  }

  try {
    switch (tab) {
      case 'general':
        await saveGeneralBranding(values as GeneralBrandingValues);
        break;
      case 'contact':
        await saveContact(values as ContactValues);
        break;
      case 'social':
        await saveSocial(values as SocialValues);
        break;
      case 'notifications':
        await saveNotifications(values as NotificationsValues);
        break;
      case 'seo':
        await saveSeoAnalytics(values as SeoAnalyticsValues);
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Invalid settings.' },
        { status: 400 }
      );
    }

    const message = error instanceof Error ? error.message : 'Could not save settings.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
