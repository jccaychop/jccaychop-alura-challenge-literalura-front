import clsx from "clsx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useModal } from "../../hooks";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  const { ref, isVisible, shouldRender, handleClose } = useModal(
    isOpen,
    onClose,
  );

  // Si shouldRender es false, no renderizamos el modal en el DOM,
  // Evita renderizar el modal cuando no debería estar visible ni en animación de cierre
  if (!shouldRender) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-[5%] transition-opacity duration-300",
        { "opacity-100": isVisible, "opacity-0": !isVisible },
      )}
    >
      <div
        ref={ref}
        className={clsx(
          "max-h-11/12 w-full max-w-2xl overflow-y-auto rounded-lg bg-gray-300 p-6 pt-0 shadow-lg transition-opacity duration-300 lg:max-w-7xl",
          { "opacity-100": isVisible, "opacity-0": !isVisible },
        )}
      >
        <div className="sticky top-0 flex justify-end bg-gray-300 pt-6">
          <IoIosCloseCircleOutline
            className="hover:text-chestnut h-10 w-10 cursor-pointer transition-colors duration-300"
            onClick={handleClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
