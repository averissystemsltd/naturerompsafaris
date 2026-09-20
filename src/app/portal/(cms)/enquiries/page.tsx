import PageContainer from '@/components/layout/page-container';
import { EnquiriesList } from '@/features/enquiries/components/enquiries-list';

export default function PortalEnquiriesPage() {
  return (
    <PageContainer
      pageDescription='Review safari quotes, general contact messages, and booking enquiries.'
      pageTitle='Enquiries'
    >
      <EnquiriesList />
    </PageContainer>
  );
}
