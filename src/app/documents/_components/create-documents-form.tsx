'use client';

import { LoaderButton } from '@/components/loader-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { CheckIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import { ToggleContext } from '@/components/interactive-overlay';
import { z } from 'zod';
import FileUploadDropzone from './fileUploadDropZone';
import SearchableSelect from '@/app/containers/_components/SearchableSelect';
import SelectedFileCard from './selectedFileCard';

export const fileUploadSchema = z.object({
  selectedFile: z.array(z.any()).min(1, {
    message: 'Pelo menos um arquivo deve ser selecionado',
  }),
  selectedContainer: z.string().min(1, 'Por favor, selecione uma caixa'),
});

interface CreateDocumentFormProps {
  containerOptions: { id: number; name: string; description?: string }[];
}

interface SelectItemType {
  value: string;
  label: string;
  description?: string;
}

export function CreateDocumentForm({
  containerOptions,
}: CreateDocumentFormProps) {
  const { setIsOpen } = useContext(ToggleContext);
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Mapeando os containerOptions para o formato esperado por SelectItemType
  const mappedContainers: SelectItemType[] = containerOptions.map((container) => ({
    value: container.id.toString(), // Usando o 'id' como 'value'
    label: container.name, // Usando o 'name' como 'label'
    description: container.description,
  }));

  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      selectedFile: [] as any[], 
      selectedContainer: '',
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof fileUploadSchema>) => {
    try {
      if (selectedFiles.length === 0) {
        throw new Error('Você deve selecionar ao menos um arquivo');
      }

      toast({
        title: 'Documento Criado',
        description: 'O documento foi criado com sucesso!',
      });

      setIsOpen(false);
    } catch (err: any) {
      toast({
        title: 'Erro',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      setValue('selectedFile', fileArray);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, i) => i !== index);
      setValue('selectedFile', newFiles);
      return newFiles;
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-10"
      >
        {/* Select container */}
        <FormField
          control={control}
          name="selectedContainer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecione a Caixa</FormLabel>
              <FormControl>
                <SearchableSelect
                  items={mappedContainers} // Usando o array mapeado aqui
                  selectedValue={field.value}
                  onValueChange={(value) => setValue('selectedContainer', value || '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File upload */}
        <FormItem>
          <FormLabel>Anexe um documento</FormLabel>
          {selectedFiles.length === 0 ? (
            <FileUploadDropzone onFileChange={(e) => handleFileChange(e.target.files)} />
          ) : (
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <SelectedFileCard
                  key={index}
                  fileName={file.name}
                  fileSize={file.size}
                  onRemoveClick={() => removeFile(index)}
                  showRemoveButton={true}
                />
              ))}
            </div>
          )}
        </FormItem>

        <LoaderButton isLoading={isSubmitting}>
          <CheckIcon className="h-5" /> Carregar Documento
        </LoaderButton>
      </form>
    </Form>
  );
}

