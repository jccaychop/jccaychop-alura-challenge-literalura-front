import { IoIosCloseCircleOutline } from "react-icons/io";
import { useModal } from "../../hooks";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  const modalRef = useModal(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-[5%]">
      <div
        ref={modalRef}
        className="max-h-11/12 w-full max-w-2xl overflow-y-auto rounded-lg bg-gray-300 p-6 pt-0 shadow-lg lg:max-w-7xl"
      >
        <div className="sticky top-0 flex justify-end bg-gray-300 pt-6">
          <IoIosCloseCircleOutline
            className="hover:text-chestnut h-10 w-10 cursor-pointer transition-colors duration-300"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
