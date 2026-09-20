import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

type PublicSocialLinksProps = {
  className?: string;
  socialLinks: Record<string, string | null | undefined>;
};

const SOCIAL_ITEMS = [
  { hrefKey: 'facebook', icon: Icons.facebook, label: 'Facebook' },
  { hrefKey: 'instagram', icon: Icons.instagram, label: 'Instagram' },
  { hrefKey: 'youtube', icon: Icons.youtube, label: 'YouTube' },
  { hrefKey: 'tiktok', icon: Icons.tiktok, label: 'TikTok' }
] as const;

export function PublicSocialLinks({ className, socialLinks }: PublicSocialLinksProps) {
  return (
    <div aria-label='Social media' className={cn('nr-topbar__social', className)}>
      {SOCIAL_ITEMS.map(({ hrefKey, icon: Icon, label }) => {
        const href = socialLinks[hrefKey]?.trim();
        const platform = label.toLowerCase();

        if (href) {
          return (
            <a
              aria-label={label}
              className={`nr-topbar__social-link nr-topbar__social-link--${platform}`}
              href={href}
              key={label}
              rel='noopener noreferrer'
              target='_blank'
            >
              <Icon />
            </a>
          );
        }

        return (
          <span
            aria-hidden
            className={`nr-topbar__social-link is-disabled nr-topbar__social-link--${platform}`}
            key={label}
            title={`${label} link coming soon`}
          >
            <Icon />
          </span>
        );
      })}
    </div>
  );
}
