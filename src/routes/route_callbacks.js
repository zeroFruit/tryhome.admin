import store from '../store';

import { fetchItems, selectItem, fetchSite } from '../actions/index';

const getSiteIndex = path => path.split('/').pop();

export function onItemIndexEnter() {
  let siteIndex = getSiteIndex(window.location.pathname);
  // store.dispatch(fetchItems({ siteIndex }));
}

export function onNewItemEnter() {
  let siteIndex = getSiteIndex(window.location.pathname);
  // store.dispatch(fetchSite({ siteIndex }));
}

export function onSiteIndexEnter() {
  let siteIndex = getSiteIndex(window.location.pathname);

  store.dispatch(fetchSite({ siteIndex }));
}

export function onSiteEditEnter() {
  let siteIndex = getSiteIndex(window.location.pathname);

}
