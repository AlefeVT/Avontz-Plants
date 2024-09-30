export interface PlantData {
    id: number;
    userId: number;
    name: string;
    scientificName: string | null;
    description: string;
    history: string | null;
    photos: string | null;
    qrCode: string | null;
    createdAt: Date | null; // Permite que o campo seja Date ou null
    deletedAt?: Date | null; // Campo opcional para plantas deletadas
  }
  