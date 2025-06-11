import type { AuthorStrictWithBooks, AuthorWithBooks } from "../../api/api";
import { reverseText } from "../../utils";

type Props = {
  authors: AuthorWithBooks[] | AuthorStrictWithBooks[];
};

export const AuthorTable = ({ authors }: Props) => {
  return (
    <div className="hidden overflow-x-auto shadow-md sm:rounded-lg md:block">
      <table className="w-full text-left text-base">
        <thead className="bg-chestnut/60 text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              #
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Nac.
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Fall.
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Libros
            </th>
          </tr>
        </thead>
        <tbody>
          {authors.map(({ id, name, birthYear, deathYear, books }, item) => (
            <tr
              key={id}
              className="odd:bg-chestnut/10 even:bg-chestnut/20 border-b border-gray-200"
            >
              <th className="px-6 py-4 font-semibold text-gray-900">
                {item + 1}
              </th>
              <th className="px-6 py-4 font-semibold text-gray-900">
                {reverseText(name)}
              </th>
              <td className="px-6 py-4">{birthYear}</td>
              <td className="px-6 py-4">{deathYear}</td>
              <td className="px-6 py-4">
                <ul className="list-outside list-disc space-y-1 pl-5">
                  {books.map(({ id, title }) => (
                    <li key={id}>{reverseText(title)}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
