import { getMovies, getTV } from "../../../api/services/MoviePageServices";

async function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(url); // fail gracefully
    img.src = url;
  });
}

export default async function (page) {
  const movies = await getMovies(true);
  const series = await getTV(true);
  const movieUrls = movies.map(
    (m) => `https://image.tmdb.org/t/p/w342${m.poster_path}`
  );
  const seriesUrls = series.map(
    (s) => `https://image.tmdb.org/t/p/w342${s.poster_path}`
  );
  console.time("image-preload");
  await Promise.all([...movieUrls, ...seriesUrls].map(preloadImage));
  console.timeEnd("image-preload");
  page.props = [movies, series];
}
