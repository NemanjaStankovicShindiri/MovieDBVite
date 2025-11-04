import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import home from "./pages/HomePage/home";

export default {
  root: "home",
  routes: [
    { path: "home", widgets: ["Menu"], component: HomePage, on: home },
    { path: "movies", widgets: ["Menu"], component: MoviesPage },
    { path: "series", widgets: ["Menu"], component: SeriesPage },
    {
      path: "details/:mediaId",
      hook: (application, { mediaId }) => {
        console.log(mediaId);
      },
      component: DetailsPage,
    },
  ],
};
