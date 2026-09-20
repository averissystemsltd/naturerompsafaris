import PageContainer from '@/components/layout/page-container';
import { TourWizard } from '@/features/portal/cms/tours/tour-wizard';
import { getTourRelationOptions } from '@/features/portal/cms/tours/service';

export default async function NewTourPage() {
  const options = await getTourRelationOptions();

  return (
    <PageContainer
      pageTitle='New safari tour'
      pageDescription='Build a safari itinerary and link lodges, experiences, and fleet.'
    >
      <TourWizard options={options} />
    </PageContainer>
  );
}
