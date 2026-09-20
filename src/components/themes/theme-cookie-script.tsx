import Script from 'next/script';

import { DEFAULT_THEME, THEMES } from '@/components/themes/theme.config';

const THEME_VALUES = THEMES.map((theme) => theme.value);

/**
 * Blocking inline script: applies the `active_theme` cookie to <html data-theme>
 * before hydration so the root layout can stay static (no cookies() on the
 * server). Uses next/script `beforeInteractive` so React does not treat it as a
 * client-rendered raw <script> (which never executes and warns in React 19).
 */
export function ThemeCookieScript() {
  const allowed = JSON.stringify(THEME_VALUES);
  const fallback = JSON.stringify(DEFAULT_THEME);

  return (
    <Script id='active-theme-cookie' strategy='beforeInteractive'>
      {`(function(){try{var allowed=${allowed};var fallback=${fallback};var match=document.cookie.match(/(?:^|; )active_theme=([^;]*)/);var value=match?decodeURIComponent(match[1]):'';if(allowed.indexOf(value)===-1)value=fallback;document.documentElement.setAttribute('data-theme',value);}catch(e){}})();`}
    </Script>
  );
}
