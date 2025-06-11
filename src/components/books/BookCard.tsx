import clsx from "clsx";
import type { BookFull } from "../../api/api";
import { reverseText } from "../../utils";
import { coverNotAvailable } from "../../assets/img";

type Props = {
  book: BookFull;
  onClick: () => void;
};

export const BookCard = ({ book, onClick }: Props) => {
  return (
    <div
      key={book.id}
      className="bg-chestnut/30 shadow-dark-charcoal/50 hover:outline-dark-charcoal/80 flex w-full cursor-pointer flex-col gap-3 rounded-md p-4 shadow outline-2 outline-transparent transition-[colors_transform] duration-500 hover:scale-105"
      onClick={onClick}
    >
      <div className="flex-3">
        <img
          className={clsx("h-auto w-full", {
            "bg-dark-charcoal": book.formats["image/jpeg"] == undefined,
          })}
          src={
            book.formats["image/jpeg"]
              ? book.formats["image/jpeg"]
              : coverNotAvailable
          }
          loading="lazy"
          alt="cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h4 className="line-clamp-3 text-center font-bold">{book.title}</h4>
        {book.authors.map(({ id, name }) => (
          <span key={id} className="inline-flex text-sm">
            {reverseText(name)}
          </span>
        ))}
      </div>
    </div>
  );
};
