import type { BookFull } from "../../api/api";
import { ExpandableText } from "../text";
import { reverseText } from "../../utils";
import { languageCodes } from "../../constants";

interface Props {
  data: BookFull;
}

export const BookInfoMobile = ({ data }: Props) => {
  const { title, summaries, authors, translators, languages, downloadCount } =
    data;

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

      {translators.length > 0 && (
        <div>
          <dt className="font-bold text-gray-700">Traductor(es)</dt>
          <dd className="text-gray-900">
            <ul className="list-outside list-disc space-y-1 pl-5">
              {translators.map(({ id, name }) => (
                <li key={id}>{reverseText(name)}</li>
              ))}
            </ul>
          </dd>
        </div>
      )}

      <div>
        <dt className="font-bold text-gray-700">Sumario</dt>
        <dd className="text-gray-900">
          <ExpandableText text={summaries[0] ?? ""} />
        </dd>
      </div>

      <div>
        <dt className="font-bold text-gray-700">Idiomas</dt>
        <dd className="text-gray-900">
          {(languages ?? [])
            .map((code) => languageCodes[code] ?? code)
            .join(", ")}
        </dd>
      </div>

      <div>
        <dt className="font-bold text-gray-700">Total de descargas</dt>
        <dd className="text-gray-900">{downloadCount}</dd>
      </div>
    </dl>
  );
};
