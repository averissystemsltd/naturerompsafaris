import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { ContourBackground } from '@/components/public/contour-background';
import { BrandButton } from '@/components/public/ui/brand-button';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { SectionHeader } from '@/components/public/ui/section-header';
import type { HomeArticle } from '@/lib/public/home-content';
import { localePath } from '@/lib/public/locale-path';
import type { PublicBlogPost } from '@/lib/public/types';

function formatDate(value: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

function toArticles(posts: PublicBlogPost[]): HomeArticle[] {
  return posts.map((post) => ({
    author: 'Nature Romp Safaris',
    category: post.category ?? 'Safari Journal',
    date: formatDate(post.publishedAt),
    excerpt: post.excerpt ?? '',
    href: post.href,
    id: post.id,
    imageAlt: post.imageAlt ?? post.title,
    imageUrl: post.imageUrl,
    title: post.title
  }));
}

function ArticleCard({ article }: { article: HomeArticle }) {
  return (
    <article
      className='group flex h-full flex-col overflow-hidden rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white transition-shadow duration-300 hover:shadow-lg'
      data-reveal-item
    >
      <Link className='relative block aspect-[16/10] overflow-hidden' href={article.href}>
        {article.imageUrl ? (
          <Image
            alt={article.imageAlt}
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            fill
            sizes='(max-width:768px) 100vw, 33vw'
            src={article.imageUrl}
          />
        ) : (
          <span aria-hidden className='absolute inset-0 bg-[var(--brand-primary-light)]' />
        )}
      </Link>
      <div className='flex flex-1 flex-col p-6'>
        <div className='flex items-center gap-2.5 text-xs uppercase tracking-wide'>
          <span className='font-bold text-[var(--brand-lime)]'>{article.category}</span>
          {article.date ? (
            <>
              <span className='h-1 w-1 rounded-full bg-[var(--brand-line)]' />
              <span className='text-[var(--brand-muted)]'>{article.date}</span>
            </>
          ) : null}
        </div>
        <h3 className='brand-heading mt-3 font-display text-xl leading-snug'>
          <Link className='transition-colors hover:text-[var(--brand-primary)]' href={article.href}>
            {article.title}
          </Link>
        </h3>
        {article.excerpt ? (
          <p className='brand-body mt-3 line-clamp-3 flex-1 text-sm leading-7'>{article.excerpt}</p>
        ) : null}
        <Link
          className='mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]'
          href={article.href}
        >
          Read Article
          <Icons.arrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
        </Link>
      </div>
    </article>
  );
}

export function HomeArticles({ locale, posts = [] }: { locale: string; posts?: PublicBlogPost[] }) {
  const articles = toArticles(posts).slice(0, 3);
  if (!articles.length) return null;

  return (
    <section className='brand-section relative overflow-hidden bg-[var(--brand-ivory)]'>
      <ContourBackground opacity={0.06} />
      <div className='brand-container relative'>
        <SectionHeader
          description='Safari stories, destination notes, and practical packing advice from the Nature Romp team in Nairobi.'
          eyebrow='From the journal'
          title='Featured safari articles'
        />

        <ScrollReveal className='mt-12 grid gap-6 md:grid-cols-3 md:gap-8' stagger>
          {articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </ScrollReveal>

        <div className='mt-12 flex justify-center'>
          <BrandButton href={localePath(locale, '/blog')} variant='accent-outline'>
            View All Articles
            <Icons.arrowRight className='h-4 w-4' />
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
