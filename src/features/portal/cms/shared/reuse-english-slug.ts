type QueryBuilder = {
  from: (table: string) => {
    select: (column: string) => {
      eq: (
        column: string,
        value: string
      ) => {
        eq: (
          column: string,
          value: string
        ) => {
          maybeSingle: () => Promise<{ data: Record<string, unknown> | null }>;
        };
      };
    };
  };
};

/**
 * When the editor is still on `/new` after a first autosave, reuse the row that
 * already owns this English slug instead of inserting a duplicate.
 */
export async function findEnglishIdBySlug(
  supabase: unknown,
  table: string,
  parentColumn: string,
  slug: string
): Promise<string | undefined> {
  const trimmed = slug.trim();
  if (!trimmed) return undefined;

  const { data } = await (supabase as QueryBuilder)
    .from(table)
    .select(parentColumn)
    .eq('locale', 'en')
    .eq('slug', trimmed)
    .maybeSingle();

  const id = data?.[parentColumn];
  return typeof id === 'string' && id.length > 0 ? id : undefined;
}

export function mapLocaleSlugError(message: string, entity: string): string {
  if (message.includes('_locale_slug_key') || message.includes('locale_slug')) {
    return `This URL slug is already used by another ${entity}. Change the slug and try again.`;
  }
  return message;
}
