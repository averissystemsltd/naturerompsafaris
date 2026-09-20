import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface EmptyCmsStateProps {
  actionHref?: string;
  actionLabel?: string;
  message: string;
  title: string;
}

export function EmptyCmsState({ actionHref, actionLabel, message, title }: EmptyCmsStateProps) {
  return (
    <div className='mx-auto flex max-w-md flex-col items-center gap-3 py-4 text-center'>
      <p className='text-sm font-medium text-[#111827]'>{title}</p>
      <p className='text-muted-foreground text-sm'>{message}</p>
      {actionHref && actionLabel ? (
        <Button asChild className='mt-1' size='sm'>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}

export function cmsListEmptyCopy({
  createHref,
  createLabel,
  entityPlural,
  hasFilters,
  isTrashView,
  status
}: {
  createHref: string;
  createLabel: string;
  entityPlural: string;
  hasFilters: boolean;
  isTrashView: boolean;
  status: string;
}): EmptyCmsStateProps {
  if (isTrashView) {
    return {
      title: 'Trash is empty',
      message: `Nothing in ${entityPlural} trash.`
    };
  }

  if (hasFilters) {
    return {
      title: `No matching ${entityPlural}`,
      message: 'Try a different search or clear the filters.'
    };
  }

  if (status === 'published') {
    return {
      title: `No published ${entityPlural} yet`,
      message: 'Drafts stay private until you publish them.'
    };
  }

  if (status === 'draft') {
    return {
      actionHref: createHref,
      actionLabel: createLabel,
      title: 'No drafts',
      message: `Create one to start this catalogue.`
    };
  }

  return {
    actionHref: createHref,
    actionLabel: createLabel,
    title: `No ${entityPlural} yet`,
    message: 'Add the first one to start filling this catalogue.'
  };
}
