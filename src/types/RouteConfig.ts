import type { PathRouteProps } from "react-router-dom";

export interface RouteConfig extends PathRouteProps {
  text?: string;
  icon?: string;
  routes?: RouteConfig[];
}