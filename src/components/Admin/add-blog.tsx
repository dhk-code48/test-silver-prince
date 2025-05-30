"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { useModal } from "../shared/modal/modal-provider";
import { Modal } from "../shared/modal/modal";
import { BlogForm } from "./forms/blog-form";

const AddBlog = ({ afterSubmit }: { afterSubmit: () => void }) => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <Modal title="Add New Blog" size="5xl">
        <BlogForm
          onSuccess={() => {
            closeModal();
            afterSubmit();
          }}
        />
      </Modal>
    );
  };

  return (
    <Button className="gap-2" onClick={handleOpenModal} id="add-blog-button">
      <PlusCircle className="mr-2 size-4" />
      Add New Blog
    </Button>
  );
};

export default AddBlog;
