"use client";

import type React from "react";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useModal } from "./modal-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full" | "5xl";

interface ModalProps {
  title?: string;
  size?: ModalSize;
  showCloseButton?: boolean;
  preventCloseOnOutsideClick?: boolean;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

export function Modal({
  title,
  size = "md",
  showCloseButton = true,
  preventCloseOnOutsideClick = false,
  className,
  contentClassName,
  children,
}: ModalProps) {
  const { isOpen, closeModal } = useModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (preventCloseOnOutsideClick) return;
    if (overlayRef.current === e.target) {
      closeModal();
    }
  };

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    // Find all focusable elements
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    modalElement.addEventListener("keydown", handleTabKey);
    firstElement.focus();

    return () => {
      modalElement.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen]);

  // Size classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "5xl": "max-w-5xl",
    full: "max-w-[95vw] h-[90vh]",
  };

  // Only render if we're in the browser
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      aria-modal="true"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        className={cn(
          "bg-background rounded-lg max-h-[90vh] overflow-y-scroll shadow-lg w-full transform transition-all duration-300 ease-in-out",
          sizeClasses[size],
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
          contentClassName
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex justify-between items-center p-4 border-b">
            {title && <h2 className="font-semibold text-xl">{title}</h2>}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="rounded-full w-8 h-8"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
        <div
          className={cn(
            "p-4",
            size === "full" && "overflow-auto max-h-[calc(90vh-4rem)]"
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
