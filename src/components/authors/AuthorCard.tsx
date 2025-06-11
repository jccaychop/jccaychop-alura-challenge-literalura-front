import { FaBirthdayCake, FaCross } from "react-icons/fa";
import type { AuthorStrictWithBooks, AuthorWithBooks } from "../../api/api";
import { reverseText } from "../../utils";

type Props = {
  authors: AuthorWithBooks[] | AuthorStrictWithBooks[];
};

export const AuthorCard = ({ authors }: Props) => {
  return (
    <div className="flex flex-col gap-8 md:hidden">
      {authors.map(({ id, name, birthYear, deathYear, books }) => (
        <div
          key={id}
          className="bg-chestnut/20 flex flex-col gap-3 rounded border p-4 shadow-sm"
        >
          <h4 className="text-center text-2xl font-semibold">
            {reverseText(name)}
          </h4>
          <div className="flex justify-center gap-5 text-sm">
            <div className="flex items-center gap-2">
              <span>{birthYear}</span>
              <FaBirthdayCake />
            </div>
            <div className="flex items-center gap-2">
              <FaCross />
              <span>{deathYear}</span>
            </div>
          </div>
          <p>
            <strong>Libros:</strong>
          </p>
          <ul className="list-disc pl-5">
            {books.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
