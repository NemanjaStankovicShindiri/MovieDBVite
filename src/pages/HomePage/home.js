import { getMovies, getTV } from "./Service";
export default async function (page) {
  const movies = await getMovies(true);
  const series = await getTV(true);
  console.log("Movies", movies);
  console.log("Series", series);
  page.props = [movies, series];
}
