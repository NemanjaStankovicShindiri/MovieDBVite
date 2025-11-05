import { getMovies, getTV } from "../../../api/services/MoviePageServices";
export default async function (page) {
  const movies = await getMovies(true);
  const series = await getTV(true);
  page.props = [movies, series];
}
