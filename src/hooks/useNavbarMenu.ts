import { useState, useEffect } from "react";

export const useNavbarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

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

  return { isOpen, setIsOpen, onToggle };
};
