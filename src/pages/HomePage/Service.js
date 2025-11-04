import tmdbApi from "../../api/tmdbInstance";
export async function getMovies(slice) {
  try {
    const result = await tmdbApi.get(`/discover/movie`);
    const returnValue = slice
      ? result.data.results.slice(0, 5)
      : result.data.results;
    return returnValue.map((item) => ({
      title: item.title,
      poster_path: item.poster_path,
      overview: item.overview,
      backdrop_path: item.backdrop_path,
      id: item.id,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTV(slice) {
  try {
    const result = await tmdbApi.get(`/discover/tv`);
    const returnValue = slice
      ? result.data.results.slice(0, 5)
      : result.data.results;
    return returnValue.map((item) => ({
      title: item.name,
      poster_path: item.poster_path,
      overview: item.overview,
      backdrop_path: item.backdrop_path,
      id: item.id,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
