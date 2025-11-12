import { getTV } from "../../../api/services/MediaServices";

export default async function (page) {
  const series = await getTV(false);
  page.props = series;
}
