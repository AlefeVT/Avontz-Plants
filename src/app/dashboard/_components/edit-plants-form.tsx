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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { CheckIcon } from 'lucide-react';
import { useContext } from 'react';
import { ToggleContext } from '@/components/interactive-overlay';
import { z } from 'zod';
import { schema } from '../validation';
import { updatePlantAction } from '../actions';

interface EditPlantFormProps {
  plantData: {
    id: number;
    name: string;
    scientificName?: string | null;
    description?: string;
    history?: string | null;
    photos?: string | null;
  };
}

export function EditPlantForm({ plantData }: EditPlantFormProps) {
  const { setIsOpen } = useContext(ToggleContext);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: plantData.name,
      scientificName: plantData.scientificName || '',
      description: plantData.description || '',
      history: plantData.history || '',
      photos: plantData.photos || '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await updatePlantAction({
        ...values,
        id: plantData.id,
      });

      toast({
        title: 'Planta Atualizada',
        description: 'A planta foi atualizada com sucesso!',
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

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-10"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da planta</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite o nome da planta" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="scientificName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Científico (Opcional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite o nome científico" value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descreva a planta"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="history"
          render={({ field }) => (
            <FormItem>
              <FormLabel>História (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Conte a história da planta"
                  rows={4}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <LoaderButton isLoading={isSubmitting}>
          <CheckIcon className="h-5" /> Atualizar Planta
        </LoaderButton>
      </form>
    </Form>
  );
}
