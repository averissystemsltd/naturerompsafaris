import PageContainer from '@/components/layout/page-container';
import { PackageWizard } from '@/features/portal/cms/packages/package-wizard';
import { getPackageTourOptions } from '@/features/portal/cms/packages/service';

export default async function NewPackagePage() {
  const tourOptions = await getPackageTourOptions();

  return (
    <PageContainer
      pageTitle='New safari package'
      pageDescription='Create a comfort-tier package variant from an existing trip route.'
    >
      <PackageWizard tourOptions={tourOptions} />
    </PageContainer>
  );
}
