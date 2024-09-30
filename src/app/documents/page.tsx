import { PageHeader } from '@/components/page-header';
import { cn } from '@/lib/utils';
import { pageTitleStyles } from '@/styles/common';
import { getContainersData } from '@/use-cases/containers';
import { CreateDocumentButton } from './_components/create-documents-button';

export default async function DocumentsView() {
  const containersData = await getContainersData();

  return (
    <div>
      <PageHeader>
        <h1
          className={cn(
            pageTitleStyles,
            'flex justify-between items-center flex-wrap gap-4'
          )}
        >
          Documentos
          <CreateDocumentButton
            containerOptions={containersData.containersWithoutChildren || []}
          />
        </h1>

        <p className="text-sm sm:text-md font-semibold text-muted-foreground">
        Organize seus documentos de forma eficiente em pastas e subpastas, facilitando o acesso e gerenciamento.
        </p>
      </PageHeader>

      <div className={cn('space-y-8 container mx-auto py-12 min-h-screen')}>
        <div className="gap-8">
          
        </div>
      </div>
    </div>
  );
}
