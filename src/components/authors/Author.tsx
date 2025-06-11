type Props = {
  children: React.ReactNode;
};

export const Author = ({ children }: Props) => {
  return (
    <div className="mx-auto w-full max-w-11/12 pb-9">
      <div className="w-full">
        <div className="">{children}</div>
      </div>
    </div>
  );
};
