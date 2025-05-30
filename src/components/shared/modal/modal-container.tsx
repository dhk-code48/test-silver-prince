"use client";

import { useModal } from "./modal-provider";

export function ModalContainer() {
  const { isOpen, content } = useModal();

  if (!isOpen) return null;

  return <>{content}</>;
}
