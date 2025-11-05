import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import MEDIA_TYPE from "./consts/mediaType";
import movieDetails from "./pages/DetailsPage/provider/movieDetails";
import seriesDetails from "./pages/DetailsPage/provider/seriesDetails";
import home from "./pages/HomePage/provider/home";

export default {
  root: "home",
  routes: [
    { path: "home", widgets: ["Menu"], component: HomePage, on: home },
    {
      path: MEDIA_TYPE.MOVIES.toLowerCase(),
      widgets: ["Menu"],
      component: MoviesPage,
    },
    {
      path: MEDIA_TYPE.SERIES.toLowerCase(),
      widgets: ["Menu"],
      component: SeriesPage,
    },
    {
      path: MEDIA_TYPE.MOVIES.toLowerCase() + "/:mediaId",
      component: DetailsPage,
      on: movieDetails,
    },
    {
      path: MEDIA_TYPE.SERIES.toLowerCase() + "/:mediaId",
      component: DetailsPage,
      on: seriesDetails,
    },
  ],
};
