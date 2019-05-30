/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from './containers/HomePage';
import MainLayout from './layouts/MainLayout';

export default () => (
  <MainLayout>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </MainLayout>
);
