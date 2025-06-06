import { useEffect, useRef } from "react";

export const useModal = (
  isOpen: boolean,
  onClose: () => void,
): React.RefObject<HTMLDivElement | null> => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Cierre con tecla Escape o clic fuera del modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Bloqueo de scroll del body
  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }

    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return modalRef;
};
