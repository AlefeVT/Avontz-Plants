'use server';

import {
  createPlantUseCase,
  updatePlantUseCase,
  deletePlantUseCase,
} from '@/use-cases/plants';
import { authenticatedAction } from '../../lib/safe-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { schema } from './validation';

// Ação para criar uma nova planta
export const createPlantAction = authenticatedAction
  .createServerAction()
  .input(schema)
  .handler(
    async ({ input: { name, scientificName, description, history, photos }, ctx: { user } }) => {
      await createPlantUseCase({
        name,
        scientificName,
        description,
        history,
        photos,
        userId: user.id,
      });

      revalidatePath('/dashboard/plants');
    }
  );

// Ação para atualizar uma planta existente
export const updatePlantAction = authenticatedAction
  .createServerAction()
  .input(
    schema.extend({
      id: z.number(),
    })
  )
  .handler(
    async ({ input: { id, name, scientificName, description, history, photos }, ctx: { user } }) => {
      await updatePlantUseCase({
        id,
        name,
        scientificName,
        description,
        history,
        photos,
      });

      revalidatePath('/dashboard/plants');
    }
  );

// Ação para deletar uma planta
export const deletePlantAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      ids: z.array(z.number()),
    })
  )
  .handler(async ({ input: { ids }, ctx: { user } }) => {
    for (const id of ids) {
      await deletePlantUseCase(id);
    }

    revalidatePath('/dashboard/plants');
  });
