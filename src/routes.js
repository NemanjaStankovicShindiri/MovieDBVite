import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";

export default {
  root: "home",
  routes: [
    { path: "home", component: HomePage },
    {
      path: "details/:mediaId",
      hook: (application, { mediaId }) => {
        console.log(mediaId);
      },
      component: DetailsPage,
    },
  ],
};
