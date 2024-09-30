'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { btnIconStyles, btnStyles } from '@/styles/icons';
import { InteractiveOverlay } from '@/components/interactive-overlay';
import { useState } from 'react';
import { CreateDocumentForm } from './create-documents-form';

export function CreateDocumentButton({
    containerOptions,
}: {
    containerOptions: any[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <InteractiveOverlay
        title={'Criar Documento'}
        description={
          'Carregue algum dos seus documentos que deseja melhorar sua organização e gerencia.'
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        form={<CreateDocumentForm containerOptions={containerOptions} />}
      />

      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        className={btnStyles}
      >
        <PlusCircle className={btnIconStyles} />
        Criar Documento
      </Button>
    </>
  );
}
