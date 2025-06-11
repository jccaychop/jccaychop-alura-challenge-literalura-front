import { useEffect, useRef, useState, useCallback } from "react";

type UseModalReturn = {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  shouldRender: boolean;
  handleClose: () => void;
};

export const useModal = (
  isOpen: boolean,
  onClose: () => void,
  fadeDuration = 300, // ms, ajustable
): UseModalReturn => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  // Cerrar modal con animación
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setShouldRender(false);
    }, fadeDuration);
  }, [fadeDuration, onClose]);

  // Mostrar modal y preparar animación
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Pequeño delay para disparar la animación fade-in después del render
      setTimeout(() => setIsVisible(true), 20);
    } else {
      // Si el modal se cierra desde fuera, iniciar fade-out
      if (shouldRender) {
        setIsVisible(false);
        setTimeout(() => setShouldRender(false), fadeDuration);
      }
    }
  }, [isOpen, fadeDuration, shouldRender]);

  // Manejo de cierre con tecla Escape o click fuera
  useEffect(() => {
    if (!shouldRender) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose, shouldRender]);

  // Bloquear scroll body solo mientras modal está montado
  useEffect(() => {
    if (shouldRender) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [shouldRender]);

  return { ref, isVisible, shouldRender, handleClose };
};
