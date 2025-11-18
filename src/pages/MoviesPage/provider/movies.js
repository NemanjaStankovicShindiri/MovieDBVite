import { getMovies } from '../../../api/services/MediaServices';

export default async function (page) {
  const movies = await getMovies(false);
  page.props = movies;
}
