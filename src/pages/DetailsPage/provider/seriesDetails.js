import {
  getAgeRestriction,
  getSeriesDetails,
  getTVCredits,
} from "../../../api/services/DetailsPageServices";
export default async function (page, { mediaId }) {
  const seriesDetails = await getSeriesDetails(mediaId);
  const ratingData = await getAgeRestriction(mediaId, false);
  const credits = await getTVCredits(mediaId);
  var ratingValue = "";
  if (!ratingData) {
    ratingValue = "NR";
  } else {
    ratingValue =
      ratingData?.results.find((item) => item.iso_3166_1 === "US")
        ?.release_dates?.[0].certification ?? "NR";
  }

  page.props = { ...seriesDetails, rating: ratingValue, credits };
}
