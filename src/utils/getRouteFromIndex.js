import ROUTES_INDEX from "../consts/routesIndex";
export function getRouteFromIndex(index) {
  const entry = Object.entries(ROUTES_INDEX).find(
    ([_, value]) => value === index
  );
  return entry ? entry[0] : null;
}
