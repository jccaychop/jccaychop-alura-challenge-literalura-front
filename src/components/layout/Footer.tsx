import { socialLinks } from "../../constants";

export const Footer = () => {
  return (
    <footer className="bg-chestnut flex w-full items-center overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-3 py-4">
        <ul className="flex w-full flex-wrap justify-center gap-4 sm:gap-10">
          {socialLinks.map(({ path, title, Icon }) => (
            <li
              className="text-old-lace hover:text-dark-charcoal font-bold transition-colors duration-300"
              key={path}
            >
              <a href={path} target="_blank" rel="noopener noreferrer">
                <Icon className="inline-block text-lg" />
                <span className="ml-2">{title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
