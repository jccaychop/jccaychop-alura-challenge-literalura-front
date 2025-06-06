import { BookInfoCover, BookInfoDesktop, BookInfoMobile } from "./";
import type { Book } from "../../interfaces/book-response";

interface Props {
  data: Book;
}

export const BookInfo = ({ data }: Props) => {
  const { formats } = data;

  return (
    <>
      <div className="mx-auto flex flex-col items-center gap-8 py-9 lg:flex-row lg:items-start">
        <BookInfoCover formats={formats} />

        <div className="flex-1">
          <BookInfoMobile data={data} />
          <BookInfoDesktop data={data} />
        </div>
      </div>
    </>
  );
};
