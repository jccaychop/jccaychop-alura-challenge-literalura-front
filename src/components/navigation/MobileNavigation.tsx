import { NavLink } from "react-router";
import clsx from "clsx";
import { Hamburguer } from "./Hamburguer";
import { capitalize } from "../../utils";

type Link = {
  path: string;
  title: string;
};

type Props = {
  links: Link[];
  isOpen: boolean;
  onToggle: () => void;
};

export const MobileNavigation = ({ links, isOpen, onToggle }: Props) => {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full transition-colors duration-500 sm:hidden",
        {
          "bg-dark-charcoal min-h-svh": isOpen,
          "h-0 bg-transparent": !isOpen,
        },
      )}
    >
      <div className="mx-auto h-0 max-w-[1400px] px-3 py-3">
        <div className="flex h-14 items-center justify-end">
          <Hamburguer isOpen={isOpen} onToggle={onToggle} className="" />
        </div>
        <div
          className={clsx("mt-10 transition-opacity duration-500", {
            "opacity-100": isOpen,
            "pointer-events-none opacity-0": !isOpen,
          })}
        >
          <nav className="">
            <ul className="">
              {links.map(({ path, title }) => (
                <li className="" key={title}>
                  <NavLink
                    to={path}
                    onClick={onToggle}
                    className={({ isActive }) =>
                      clsx("inline-block w-full px-3.5 py-3.5", {
                        "text-old-lace bg-old-lace/20 font-medium": isActive,
                        "hover:bg-old-lace/10 font-light text-white": !isActive,
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
      </div>
    </div>
  );
};
