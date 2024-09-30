import { database } from '@/db';
import { plants } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { PublicError } from '@/use-cases/errors';
import { PlantData } from '@/interfaces/PlantData';

// Função para listar todas as plantas
export async function getPlantsData(): Promise<PlantData[]> {
  try {
    const allPlants = await database
      .select({
        id: plants.id,
        name: plants.name,
        scientificName: plants.scientificName,
        description: plants.description,
        createdAt: plants.createdAt,
        qrCode: plants.qrCode,
        userId: plants.userId,
        history: plants.history,
        photos: plants.photos,
      })
      .from(plants)
      .where(sql`${plants.deletedAt} IS NULL`);

    return allPlants;
  } catch (error) {
    console.error('Erro ao buscar dados das plantas:', error);
    return [];
  }
}

// Função para cadastrar uma nova planta
export async function createPlantUseCase({
  name,
  scientificName,
  description,
  history,
  photos,
  userId,
}: {
  name: string;
  scientificName?: string | null;
  description: string;
  history?: string | null;
  photos?: string | null;
  userId: number;
}) {
  const existingPlant = await database
    .select({ id: plants.id })
    .from(plants)
    .where(eq(plants.name, name))
    .limit(1);

  if (existingPlant.length > 0) {
    throw new PublicError('Já existe uma planta com esse nome.');
  }

  const result = await database.insert(plants).values({
    name,
    scientificName: scientificName || null,
    description,
    history: history || null,
    photos: photos || null,
    userId: userId,
    createdAt: new Date(),
  });

  return result;
}

// Função para editar uma planta
export async function updatePlantUseCase({
  id,
  name,
  scientificName,
  description,
  history,
  photos,
}: {
  id: number;
  name: string;
  scientificName?: string | null;
  description: string;
  history?: string | null;
  photos?: string | null;
}) {
  const existingPlant = await database
    .select({ id: plants.id })
    .from(plants)
    .where(eq(plants.id, id))
    .limit(1);

  if (existingPlant.length === 0) {
    throw new Error('Planta não encontrada.');
  }

  const result = await database
    .update(plants)
    .set({
      name,
      scientificName: scientificName || null,
      description,
      history: history || null,
      photos: photos || null,
    })
    .where(eq(plants.id, id));

  return result;
}

// Função para deletar uma planta
export async function deletePlantUseCase(plantId: number) {
  const plant = await database
    .select({ id: plants.id })
    .from(plants)
    .where(eq(plants.id, plantId))
    .limit(1);

  if (!plant.length) {
    throw new Error('Planta não encontrada.');
  }

  await database
    .update(plants)
    .set({ deletedAt: new Date() })
    .where(eq(plants.id, plantId));
}
