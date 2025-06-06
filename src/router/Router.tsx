import { createBrowserRouter } from "react-router";
import { Root } from "./";
import { HomePage, ListPage, SearchPage } from "../pages";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
    ],
  },
]);
