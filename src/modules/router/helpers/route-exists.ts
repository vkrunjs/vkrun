import { Route } from "../../types";

export const routeExists = (path: string, method: string, routes: Route[]): boolean => {
  if (routes.find((route) => route.path === path && route.method === method)) {
    throw new Error(`vkrun-router: ${path} route is duplicated for ${method} method.`);
  }
  return true;
};
