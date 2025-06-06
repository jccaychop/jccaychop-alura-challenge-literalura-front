import type { Book } from "./../../interfaces/book-response";
import { reverseText } from "../../utils";
import { coverNotAvailable } from "../../assets/img";

type Props = {
  book: Book;
  onClick: () => void;
};

export const BookCard = ({ book, onClick }: Props) => {
  return (
    <div
      key={book.id}
      className="bg-chestnut/30 shadow-dark-charcoal/50 hover:outline-dark-charcoal/80 flex w-full cursor-pointer flex-col gap-3 rounded-md p-4 shadow outline-2 outline-transparent transition-[colors_transform] duration-500 hover:scale-105"
      onClick={onClick}
    >
      <div className="bg-dark-charcoal">
        <img
          className="h-auto w-full"
          src={
            book.formats["image/jpeg"]
              ? book.formats["image/jpeg"]
              : coverNotAvailable
          }
          alt="cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-center font-bold">{book.title}</h4>
        {book.authors.map(({ id, name }) => (
          <span key={id} className="inline-flex text-sm">
            {reverseText(name)}
          </span>
        ))}
      </div>
    </div>
  );
};
