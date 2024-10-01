"use client";

import { EllipsisVertical, PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/delete-modal";
import { useServerAction } from "zsa-react";
import { Plants } from "@/db/schema";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { InteractiveOverlay } from "@/components/interactive-overlay";
import { deletePlantAction } from "../../actions";
import { EditPlantForm } from "../edit-plants-form";

export function PlantsActions({ plant }: { plant: Plants }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditPlantOpen, setIsEditPlantOpen] = useState(false);
  const { execute, isPending } = useServerAction(deletePlantAction, {
    onSuccess() {
      setIsOpen(false);
    },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <InteractiveOverlay
        isOpen={isEditPlantOpen}
        setIsOpen={setIsEditPlantOpen}
        title={"Editar Planta"}
        description={"Editar detalhes da planta."}
        form={<EditPlantForm plant={plant} />}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Excluir Planta"
        description="Tem certeza de que deseja excluir esta planta?"
        onConfirm={() => {
          execute({
            plantId: [plant.id],
          });
        }}
        isPending={isPending}
      />

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => {
              setIsEditPlantOpen(true);
            }}
            className={btnStyles}
          >
            <PencilIcon className={btnIconStyles} />
            Editar Planta
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(btnStyles, "text-red-500")}
            onClick={(e) => {
              setIsDeleteModalOpen(true);
            }}
          >
            <TrashIcon className={btnIconStyles} />
            Remover Planta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
