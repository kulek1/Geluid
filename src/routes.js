/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import MainLayout from './layouts/MainLayout';

export default () => (
  <MainLayout>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </MainLayout>
);
