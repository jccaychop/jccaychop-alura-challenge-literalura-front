import clsx from "clsx";
import type { BookFull } from "../../api/api";
import { ExpandableText } from "../text";
import { reverseText } from "../../utils";
import { languageCodes } from "../../constants";

interface Props {
  data: BookFull;
}

export const BookInfoDesktop = ({ data }: Props) => {
  const { title, summaries, authors, translators, languages, downloadCount } =
    data;

  return (
    <table className="hidden w-full table-auto border border-gray-300 text-left lg:table">
      <tbody>
        <tr className="border-b">
          <th className="w-44 p-2 font-semibold text-gray-700">Título</th>
          <td className="p-2">{title}</td>
        </tr>

        <tr className="border-b">
          <th className="p-2 font-semibold text-gray-700">Autor(es)</th>
          <td className="p-2">
            <ul className="list-outside list-disc space-y-1 pl-5">
              {authors.map(({ id, name }) => (
                <li key={id}>{reverseText(name)}</li>
              ))}
            </ul>
          </td>
        </tr>

        <tr
          className={clsx("border-b", {
            hidden: translators.length === 0,
          })}
        >
          <th className="p-2 font-semibold text-gray-700">Traductor(es)</th>
          <td className="p-2">
            <ul className="list-outside list-disc space-y-1 pl-5">
              {translators.map(({ id, name }) => (
                <li key={id}>{reverseText(name)}</li>
              ))}
            </ul>
          </td>
        </tr>

        <tr className="border-b">
          <th className="p-2 font-semibold text-gray-700">Sumario</th>
          <td className="p-2 text-justify text-gray-700">
            <ExpandableText text={summaries[0]} />
          </td>
        </tr>

        <tr className="border-b">
          <th className="p-2 font-semibold text-gray-700">Idiomas</th>
          <td className="p-2">
            {languages.map((code) => languageCodes[code] ?? code).join(", ")}
          </td>
        </tr>

        <tr className="border-b">
          <th className="p-2 font-semibold text-gray-700">
            Total de descargas
          </th>
          <td className="p-2">{downloadCount}</td>
        </tr>
      </tbody>
    </table>
  );
};
