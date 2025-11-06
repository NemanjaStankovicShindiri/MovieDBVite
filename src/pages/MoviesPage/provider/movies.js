import { getMovies } from "../../../api/services/MoviePageServices";

export default async function (page) {
  const movies = await getMovies(false);
  page.props = movies;
}
