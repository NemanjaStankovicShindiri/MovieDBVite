import tmdbApi from "../../api/tmdbInstance";

export async function getMovieDetails(id) {
  const response = await tmdbApi.get(`/movie/` + id);
  return response.data;
}

export async function getSeriesDetails(seriesId) {
  const response = await tmdbApi.get(`/tv/` + seriesId);
  const {
    name: title,
    genres,
    episode_run_time: runtime,
    origin_country,
    first_air_date: release_date,
    poster_path,
    overview,
    backdrop_path,
    id,
    vote_average,
  } = response.data;
  return {
    title,
    genres,
    runtime,
    origin_country,
    release_date,
    poster_path,
    overview,
    backdrop_path,
    id,
    vote_average,
  };
}

export async function getAgeRestriction(id, isMovie) {
  const response = await tmdbApi.get(
    (isMovie ? "/movie/" : "/tv/") +
      id +
      (isMovie ? "/release_dates" : "/content_ratings")
  );
  return response.data;
}
