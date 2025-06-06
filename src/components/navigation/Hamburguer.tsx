import clsx from "clsx";

type Props = {
  isOpen: boolean;
  className?: string;
  onToggle: () => void;
};

export const Hamburguer = ({ isOpen, className, onToggle }: Props) => {
  return (
    <div
      className={clsx(
        "group flex h-10 w-10 cursor-pointer items-center justify-center",
        className,
        { "": isOpen, "border-chestnut bg-chestnut border-[3px]": !isOpen },
      )}
      onClick={onToggle}
    >
      <div className="space-y-2">
        <span
          className={clsx(
            "block h-[.1875rem] w-8 origin-center rounded-full transition-transform ease-in-out",
            {
              "bg-old-lace translate-y-1.5 rotate-45": isOpen,
              "bg-white": !isOpen,
            },
          )}
        ></span>

        <span
          className={clsx(
            "block h-[.1875rem] w-8 origin-center rounded-full transition-transform ease-in-out",
            {
              "bg-old-lace -translate-y-1.5 -rotate-45": isOpen,
              "bg-white": !isOpen,
            },
          )}
        ></span>
      </div>
    </div>
  );
};
