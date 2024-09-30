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
import { useContext, useState } from 'react';
import { ToggleContext } from '@/components/interactive-overlay';
import { z } from 'zod';
import { schema } from '../validation';
import { createPlantAction } from '../actions';

export function CreatePlantsForm() {
  const { setIsOpen } = useContext(ToggleContext);
  const { toast } = useToast();
  const [parentId, setParentId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      scientificName: '',
      description: '',
      history: '',
      photos: null,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const parsedParentId = parentId ? Number(parentId) : null;
      await createPlantAction({ ...values });

      toast({
        title: 'Planta Criada',
        description: 'A planta foi criada com sucesso!',
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
              <FormLabel>Nome científico (Opcional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}  
                  placeholder="Digite o nome científico"
                />
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
                  value={field.value ?? ''}  
                  placeholder="Adicione a história da planta"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoaderButton isLoading={isSubmitting}>
          <CheckIcon className="h-5" /> Cadastrar Planta
        </LoaderButton>
      </form>
    </Form>
  );
}
