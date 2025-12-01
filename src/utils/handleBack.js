import { Router } from '@lightningjs/sdk';
export default function handleBack(e) {
  if (Router.isNavigating()) {
    return true;
  }
  // e.preventDefault();

  const routerHistory = Router.getHistory().filter(
    (history) => history.hash != 'splash' && history.hash != 'cmp'
  );

  if (routerHistory.length) {
    Router.back();
  } else {
    Router.navigate('home');
  }
}
