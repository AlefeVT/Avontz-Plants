'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { PlantData } from '@/interfaces/PlantData'; // Crie essa interface

export const columns: (
  routerPush: (url: string) => void,
  setPlantData: (plant: PlantData) => void,
  setIsOpen: (isOpen: boolean) => void,
  setSelectedPlantsForDelete: (plants: PlantData[]) => void,
  setIsDeleteModalOpen: (isOpen: boolean) => void
) => ColumnDef<PlantData>[] = (
  routerPush,
  setPlantData,
  setIsOpen,
  setSelectedPlantsForDelete,
  setIsDeleteModalOpen
) => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Nome da Planta',
    cell: ({ row }) => {
      const plant = row.original;
      return <div className="flex items-center">{plant.name}</div>;
    },
  },
  {
    accessorKey: 'scientificName',
    header: 'Nome Científico',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row, table }) => {
      const plant = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center cursor-pointer"
              onClick={() => {
                setPlantData(plant);
                setIsOpen(true);
              }}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center cursor-pointer"
              onClick={() => {
                setSelectedPlantsForDelete([plant]);
                setIsDeleteModalOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const selectedPlants = table
                  .getRowModel()
                  .rows.map((row) => row.original);

                const selectedPlantIds = Object.keys(
                  table.getState().rowSelection
                )
                  .filter((key) => table.getState().rowSelection[key])
                  .map((key) => {
                    const index = parseInt(key, 10);
                    return selectedPlants[index];
                  });

                if (selectedPlantIds.length > 0) {
                  setSelectedPlantsForDelete(selectedPlantIds);
                  setIsDeleteModalOpen(true);
                }
              }}
              disabled={Object.keys(table.getState().rowSelection).length === 0}
              className="flex items-center cursor-pointer"
            >
              <Trash2 className="h-4 w-4 mr-2 text-red-600" />
              Excluir Selecionados
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
