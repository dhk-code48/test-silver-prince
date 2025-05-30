"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { useModal } from "../shared/modal/modal-provider";
import { Modal } from "../shared/modal/modal";
import { SlideForm } from "./forms/slide-form";

const AddSlide = ({
  order,
  afterSubmit,
}: {
  order: number | undefined;
  afterSubmit: () => void;
}) => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <Modal title="Add New Slide">
        <SlideForm
          values={{ order }}
          onSuccess={() => {
            closeModal();
            afterSubmit();
          }}
        />
      </Modal>
    );
  };

  return (
    <Button className="gap-2" onClick={handleOpenModal}>
      <PlusCircle className="mr-2 size-4" />
      Add New Slide
    </Button>
  );
};

export default AddSlide;
