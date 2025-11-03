const ROUTES_INDEX = {
  home: 0,
  movies: 1,
  series: 2,
};

export function getRouteNavbarIndex(route) {
  if (route) {
    return ROUTES_INDEX[route] ?? 0;
  }
  return 0;
}
