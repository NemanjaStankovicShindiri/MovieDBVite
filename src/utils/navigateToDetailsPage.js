import { Router } from "@lightningjs/sdk";

export default function navigateToDetailsPage(id, mediaType) {
  Router.navigate(mediaType + "/" + id);
}
