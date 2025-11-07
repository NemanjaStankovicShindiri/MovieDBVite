import { getTV } from "../../../api/services/MoviePageServices";

export default async function (page) {
  const series = await getTV(false);
  page.props = series;
}
