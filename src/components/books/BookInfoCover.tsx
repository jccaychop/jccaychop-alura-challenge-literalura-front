import clsx from "clsx";
import type { Formats } from "../../api/api";
import { coverNotAvailable } from "../../assets/img";

type Props = {
  formats: Formats;
};

export const BookInfoCover = ({ formats }: Props) => {
  return (
    <div className="w-full max-w-[200px] overflow-hidden text-center lg:sticky lg:top-[6.25rem]">
      <div className="bg-dark-charcoal mb-5 max-w-[200px] border">
        <img
          className="h-auto w-full"
          src={
            formats["image/jpeg"] ? formats["image/jpeg"] : coverNotAvailable
          }
          loading="lazy"
          alt="cover"
        />
      </div>

      <a
        href={formats["application/epub+zip"] || "#"}
        className={clsx("inline-flex", {
          button: formats["application/epub+zip"],
          "button-disabled": !formats["application/epub+zip"],
        })}
        onClick={(e) => {
          if (!formats["application/epub+zip"]) {
            e.preventDefault();
          }
        }}
      >
        Descargar EPUB
      </a>
    </div>
  );
};
