import type { RouteConfig } from "../../types";
import Home from "./Home";

const routes: RouteConfig[] = [
  {
    path: "/",
    text: "Home",
    icon: "home",
    element: <Home />,
  },
];

export default routes;
