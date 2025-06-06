import { Outlet } from "react-router";
import { Footer, Header } from "../components/layout";

export const Root = () => {
  return (
    <div className="relative grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
