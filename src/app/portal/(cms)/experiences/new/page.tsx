import PageContainer from '@/components/layout/page-container';
import { ExperienceWizard } from '@/features/portal/cms/experiences/experience-wizard';
import { getExperienceFacets } from '@/features/portal/cms/experiences/service';

export default async function NewExperiencePage() {
  const facets = await getExperienceFacets();

  return (
    <PageContainer
      pageTitle='New experience'
      pageDescription='Create an experience page in a few guided steps.'
    >
      <ExperienceWizard categoryOptions={facets.categories} />
    </PageContainer>
  );
}
