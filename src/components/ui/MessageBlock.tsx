import clsx from "clsx";
import type { ResponseUnion } from "../../api/api";

type Props = {
  errorMessage?: string | null | undefined;
  data?: ResponseUnion;
};

export const MessageBlock = ({ errorMessage, data }: Props) => {
  const isError = errorMessage || data?.status === "ERROR";
  const isSuccess = data?.status !== "ERROR";
  const messages = errorMessage
    ? [errorMessage]
    : (data?.messages?.map((m) => m.message) ?? []);

  return (
    <div
      className={clsx("", {
        "bg-fire-opal/60 mx-auto mt-8 max-w-2xl p-7": isError,
        "flex justify-center gap-6 p-4": isSuccess,
      })}
    >
      {messages.map((message, idx) => (
        <span
          key={message + idx}
          className={clsx({
            "text-dark-charcoal font-semibold": isError,
          })}
        >
          {message}
        </span>
      ))}
    </div>
  );
};
