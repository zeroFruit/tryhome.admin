import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App            from '../components/app';
import ItemsIndex     from '../components/items__index';
import ItemsNew       from '../components/items__new';
import ItemsEdit      from '../components/items__edit';
import SitesIndex     from '../components/sites__index';
import SitesEdit      from '../components/sites__edit';
import SaleListIndex  from '../components/salelist__index';
import { onItemIndexEnter, onSiteIndexEnter, onNewItemEnter } from './route_callbacks';

export default (
  <Route path='/' component={App}>
    <Route path='items/:site'     component={ItemsIndex} onEnter={onItemIndexEnter}/>
    <Route path='items/new/:site' component={ItemsNew} onEnter={onNewItemEnter}/>
    <Route path='items/edit/:site'component={ItemsEdit} />
    <Route path='sites/:site'     component={SitesIndex} onEnter={onSiteIndexEnter}/>
    <Route path='sites/edit/:site'component={SitesEdit} />
    <Route path='salelist'        component={SaleListIndex} />
  </Route>
)
