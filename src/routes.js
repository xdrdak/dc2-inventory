import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import DarkCloudInventorPage from './components/DarkCloudInventorPage';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DarkCloudInventorPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
