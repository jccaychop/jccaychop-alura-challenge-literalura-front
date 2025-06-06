import { NavLink } from "react-router";
import clsx from "clsx";
import { capitalize } from "../../utils";

type Link = {
  path: string;
  title: string;
};

type Props = {
  links: Link[];
  callback: (value: boolean) => void;
};

export const DesktopNavigation = ({ links, callback }: Props) => {
  return (
    <>
      <div className="hidden h-14 w-full items-center justify-end sm:flex">
        <nav className="text-xl">
          <ul className="flex gap-11">
            {links.map(({ path, title }) => (
              <li className="relative" key={title}>
                <NavLink
                  to={path}
                  onClick={() => callback(false)}
                  className={({ isActive }) =>
                    clsx("font-medium transition-colors duration-300", {
                      "text-chestnut before:absolute before:bottom-0 before:left-0 before:w-full before:border-b-2 before:content-['']":
                        isActive,
                      "text-dark-charcoal hover:text-chestnut": !isActive,
                    })
                  }
                >
                  {capitalize(title)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
