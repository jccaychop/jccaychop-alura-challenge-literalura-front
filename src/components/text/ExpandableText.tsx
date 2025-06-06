import clsx from "clsx";
import { useExpandableText } from "../../hooks";

type Props = {
  text: string;
  wordLimit?: number;
  className?: string;
};

export const ExpandableText = ({ text, wordLimit = 30, className }: Props) => {
  const { expanded, toggle, isTruncatable, fullText } = useExpandableText(
    text,
    wordLimit,
  );

  return (
    <>
      <div className={clsx("expandable-text", { expanded: expanded })}>
        <p className={className}>{fullText}</p>
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
