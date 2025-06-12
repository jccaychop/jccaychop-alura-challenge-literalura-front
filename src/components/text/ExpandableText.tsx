import clsx from "clsx";
import { useExpandableText } from "../../hooks";

type Props = {
  text?: string;
  wordLimit?: number;
  className?: string;
};

export const ExpandableText = ({ text, wordLimit = 30, className }: Props) => {
  const safeText = text?.trim() ?? "";
  const { expanded, toggle, isTruncatable, fullText } = useExpandableText(
    safeText,
    wordLimit,
  );

  return (
    <>
      <div
        className={clsx("expandable-text", {
          expanded: expanded,
          "not-available": fullText.length === 0,
        })}
      >
        <p className={className}>
          {fullText === "" ? "Not available" : fullText}
        </p>
      </div>

      {isTruncatable && (
        <button
          onClick={toggle}
          className="text-fire-opal mt-2 inline-block cursor-pointer font-medium hover:underline focus:outline-none"
          aria-expanded={expanded}
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </>
  );
};
