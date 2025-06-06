import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Button = ({ children, className }: Props) => {
  return (
    <button
      className={clsx(
        "bg-hooker-green hover:bg-dark-slate-gray text-old-lace border-hooker-green cursor-pointer rounded-md border px-4 py-2 transition-colors duration-300 outline-none",
        className,
      )}
    >
      {children}
    </button>
  );
};
