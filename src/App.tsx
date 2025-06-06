import { RouterProvider } from "react-router";
import { Router as router } from "./router/Router";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
