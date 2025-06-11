import clsx from "clsx";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const BookGrid = ({ className, children }: Props) => {
  return (
    <div className={clsx("mx-auto w-full max-w-11/12 py-9", className)}>
      <div className="w-full">
        <div className="grid auto-rows-auto grid-cols-[repeat(auto-fit,minmax(0,232px))] justify-center gap-x-10 gap-y-12">
          {children}
        </div>
      </div>
    </div>
  );
};
