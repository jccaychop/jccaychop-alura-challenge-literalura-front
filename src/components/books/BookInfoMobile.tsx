import clsx from "clsx";
import { ExpandableText } from "../text";
import type { Book } from "../../interfaces/book-response";
import { reverseText } from "../../utils";
import langCodes from "../../data/languageCodes.json";

interface Props {
  data: Book;
}

export const BookInfoMobile = ({ data }: Props) => {
  const { title, summaries, authors, translators, languages, downloadCount } =
    data;

  const langCodesTyped = langCodes as { [key: string]: string };

  return (
    <dl className="space-y-4 lg:hidden">
      <div>
        <dt className="font-bold text-gray-700">Título</dt>
        <dd className="text-gray-900">{title}</dd>
      </div>

      <div>
        <dt className="font-bold text-gray-700">Autor(es)</dt>
        <dd className="text-gray-900">
          <ul className="list-outside list-disc space-y-1 pl-5">
            {authors.map(({ id, name }) => (
              <li key={id}>{reverseText(name)}</li>
            ))}
          </ul>
        </dd>
      </div>

      <div className={clsx("block", { hidden: translators.length === 0 })}>
        <dt className="font-bold text-gray-700">Traductor(es)</dt>
        <dd className="text-gray-900">
          <ul className="list-outside list-disc space-y-1 pl-5">
            {translators.map(({ id, name }) => (
              <li key={id}>{reverseText(name)}</li>
            ))}
          </ul>
        </dd>
      </div>

      <div>
        <dt className="font-bold text-gray-700">Sumario</dt>
        <dd className="text-gray-900">
          <ExpandableText text={summaries[0]} />
        </dd>
      </div>

      <div>
        <dt className="font-bold text-gray-700">Idiomas</dt>
        <dd className="text-gray-900">
          {languages.map((code) => langCodesTyped[code] ?? code).join(", ")}
        </dd>
      </div>

      <div>
        <dt className="font-bold text-gray-700">Total de descargas</dt>
        <dd className="text-gray-900">{downloadCount}</dd>
      </div>
    </dl>
  );
};
