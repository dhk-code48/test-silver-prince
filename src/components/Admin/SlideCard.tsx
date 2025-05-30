"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpDown,
  Edit,
  ExternalLink,
  MoreHorizontal,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { SilverPrinceSlide } from "@/lib/types";
import { toast } from "sonner";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useModal } from "../shared/modal/modal-provider";
import { Modal } from "../shared/modal/modal";
import { SlideForm } from "./forms/slide-form";

interface SlideCardProps {
  slide: SilverPrinceSlide;
  onRefetch: () => void;
}

export function SlideCard({ slide, onRefetch }: SlideCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { openModal, closeModal } = useModal();

  const handleDelete = () => {
    setShowDeleteDialog(false);
    toast.promise(
      deleteDoc(doc(db, "Slides", slide.id)).then(() => onRefetch()),
      {
        error: "Unexpected Error, Try Again!",
        loading: "Deleting slide....",
        success: "Successfully deleted slide!",
      }
    );
  };

  const handleOpenModal = () => {
    openModal(
      <Modal title="Edit Slide">
        <SlideForm
          values={slide}
          onSuccess={() => {
            closeModal();
            onRefetch();
          }}
        />
      </Modal>
    );
  };

  return (
    <>
      <Card className="hover:shadow-md overflow-hidden transition-all">
        <div className="relative w-full aspect-[2/1] overflow-hidden">
          <Image
            src={slide.banner || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="top-2 right-2 absolute">
            <Badge variant="secondary" className="opacity-90">
              Order: {slide.order}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{slide.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a
                    href={slide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 w-4 h-4" />
                    View Link
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleOpenModal}>
                  <Edit className="mr-2 w-4 h-4" />
                  Edit Slide
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash className="mr-2 w-4 h-4" />
                  Delete Slide
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="truncate">
            {slide.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center text-muted-foreground text-sm">
            <ExternalLink className="mr-1 w-3 h-3" />
            <span className="truncate">{slide.link}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            size="sm"
            onClick={handleOpenModal}
          >
            <Edit className="mr-2 w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-destructive/10 text-destructive hover:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the slide &quot;{slide.title}&quot;.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-white dark:text-black"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
