'use client';
import { useEffect, useState } from 'react';
import { useKBar } from 'kbar';
import { Icons } from '@/components/icons';
import { Button } from './ui/button';

export default function SearchInput() {
  const { query } = useKBar();
  const [modKey, setModKey] = useState('Ctrl');

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) {
      setModKey('⌘');
    }
  }, []);

  return (
    <div className='flex items-center'>
      <Button
        aria-label='Search portal'
        className='text-muted-foreground size-8 md:hidden'
        onClick={query.toggle}
        size='icon'
        type='button'
        variant='ghost'
      >
        <Icons.search className='size-4' />
      </Button>
      <Button
        className='bg-background text-muted-foreground relative hidden h-9 w-40 justify-start rounded-[0.5rem] text-sm font-normal shadow-none lg:w-64 md:inline-flex'
        onClick={query.toggle}
        type='button'
        variant='outline'
      >
        <Icons.search className='mr-2 h-4 w-4' />
        Search...
        <kbd className='bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-6 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none lg:flex'>
          <span className='text-xs'>{modKey}</span>K
        </kbd>
      </Button>
    </div>
  );
}
