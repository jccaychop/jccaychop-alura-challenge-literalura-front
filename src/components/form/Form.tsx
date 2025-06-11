import clsx from "clsx";

type Props = React.FormHTMLAttributes<HTMLFormElement>;

export const Form = (props: Props) => {
  return (
    <form
      {...props}
      className={clsx(
        "flex flex-col items-center justify-center gap-4 sm:flex-row",
        props.className,
      )}
    >
      {props.children}
    </form>
  );
};
