import { getAgeRestriction, getMovieDetails } from "./Service";
export default async function (page, { mediaId }) {
  const movieDetails = await getMovieDetails(mediaId);
  const ratingData = await getAgeRestriction(mediaId, true);
  var ratingValue = "";
  if (!ratingData) {
    ratingValue = "NR";
  } else {
    ratingValue =
      ratingData?.results.find((item) => item.iso_3166_1 === "US")
        ?.release_dates?.[0].certification ?? "NR";
  }

  page.props = { ...movieDetails, rating: ratingValue };
}
