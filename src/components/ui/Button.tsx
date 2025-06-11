import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  children,
  className,
  disabled = false,
  type = "button",
}: Props) => {
  return (
    <button
      className={clsx(className, {
        "button-disabled": disabled,
        button: !disabled,
      })}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
