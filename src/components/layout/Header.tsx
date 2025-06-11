import { NavLink } from "react-router";
import clsx from "clsx";
import { LiteraluraLogo } from "../logos";
import { DesktopNavigation, MobileNavigation } from "../navigation";
import { useNavbarMenu } from "../../hooks";
import { navLinks } from "../../constants";

export const Header = () => {
  const { isOpen, setIsOpen, onToggle } = useNavbarMenu();

  return (
    <>
      <header className="bg-old-lace sticky top-0 left-0 z-10 w-full">
        <MobileNavigation
          links={navLinks}
          isOpen={isOpen}
          onToggle={onToggle}
        />

        <div className="mx-auto max-w-[1400px] px-3 py-3">
          <div className="flex justify-between">
            <NavLink to="/" className="z-40 h-14">
              <LiteraluraLogo
                className={clsx(
                  "h-full w-auto cursor-pointer rounded-full transition-colors duration-300",
                  {
                    "bg-chestnut fill-old-lace sm:fill-chestnut sm:bg-old-lace":
                      isOpen,
                    "fill-chestnut bg-old-lace": !isOpen,
                  },
                )}
              />
            </NavLink>

            <DesktopNavigation links={navLinks} callback={setIsOpen} />
          </div>
        </div>
      </header>
    </>
  );
};
