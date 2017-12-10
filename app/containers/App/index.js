/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IndexPage from 'containers/Index/Loadable';
import Manufacturer from 'containers/Manufacturer/Loadable';
import Dealer from 'containers/Dealer/Loadable';
import Agent from 'containers/Agent/Loadable';
import Police from 'containers/Police/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Content from './styles/Content';

export default function App() {
  return (
    <div>
      <Content>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/vw" component={Manufacturer} />
          <Route exact path="/Dealer" component={Dealer} />
          <Route exact path="/Agent" component={Agent} />
          <Route exact path="/Police" component={Police} />
          <Route component={NotFoundPage} />
        </Switch>
      </Content>
    </div>
  );
}
