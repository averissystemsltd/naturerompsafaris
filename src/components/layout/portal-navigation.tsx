'use client';

import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

type PortalNavigationContextValue = {
  /** The href the user is currently navigating to, or null when idle. */
  pendingHref: string | null;
  /** True while a route transition is in-flight. */
  isNavigating: boolean;
  /** Start a client navigation with instant pending feedback. */
  navigate: (href: string, event?: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Warm the route + its loading UI so navigation feels instant. */
  prefetch: (href: string) => void;
};

const PortalNavigationContext = React.createContext<PortalNavigationContextValue | null>(null);

export function usePortalNavigation(): PortalNavigationContextValue {
  const context = React.use(PortalNavigationContext);
  if (!context) {
    throw new Error('usePortalNavigation must be used within a PortalNavigationProvider');
  }
  return context;
}

/**
 * Centralises portal navigation so every click gives immediate feedback.
 *
 * App Router keeps the previous page mounted during a `startTransition`
 * navigation (and, in dev, routes are not prefetched), so `loading.tsx` often
 * never flashes — which makes clicks feel like nothing happened. We surface the
 * transition's `isPending` state through a top progress bar and expose the
 * pending href so the sidebar can highlight the target link the instant it is
 * clicked.
 */
export function PortalNavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();
  const [pendingHref, setPendingHref] = React.useState<string | null>(null);

  // Clear the optimistic highlight once the destination has actually mounted.
  React.useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const navigate = React.useCallback(
    (href: string, event?: React.MouseEvent<HTMLAnchorElement>) => {
      if (
        event &&
        (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      ) {
        // Let the browser handle modified clicks (new tab, etc.).
        return;
      }
      event?.preventDefault();
      if (href === pathname) return;
      setPendingHref(href);
      startTransition(() => {
        router.push(href);
      });
    },
    [pathname, router]
  );

  const prefetch = React.useCallback(
    (href: string) => {
      router.prefetch(href);
    },
    [router]
  );

  const value = React.useMemo<PortalNavigationContextValue>(
    () => ({ pendingHref, isNavigating: isPending, navigate, prefetch }),
    [pendingHref, isPending, navigate, prefetch]
  );

  return (
    <PortalNavigationContext value={value}>
      <PortalNavProgress active={isPending} />
      {children}
    </PortalNavigationContext>
  );
}

/**
 * Thin top-of-viewport progress bar that trickles forward while a navigation is
 * pending and snaps to 100% on completion. Purely a client affordance; renders
 * nothing when idle.
 */
function PortalNavProgress({ active }: { active: boolean }) {
  const [progress, setProgress] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (active) {
      setProgress(8);
      const interval = window.setInterval(() => {
        setProgress((current) => {
          if (current == null) return 8;
          if (current >= 90) return current;
          return Math.min(90, current + (90 - current) * 0.12 + 1);
        });
      }, 200);
      return () => window.clearInterval(interval);
    }

    // Finish and fade out.
    setProgress((current) => (current == null ? null : 100));
    const timeout = window.setTimeout(() => setProgress(null), 300);
    return () => window.clearTimeout(timeout);
  }, [active]);

  if (progress == null) return null;

  return (
    <div
      aria-hidden
      className='pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden'
    >
      <div
        className='bg-primary h-full transition-[width,opacity] duration-300 ease-out'
        style={{ width: `${progress}%`, opacity: progress >= 100 ? 0 : 1 }}
      />
    </div>
  );
}
