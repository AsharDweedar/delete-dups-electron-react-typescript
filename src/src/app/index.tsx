import * as React from 'react';
// import { Route, Switch } from 'react-router';
// import { App as TodoApp } from 'app/containers/App';
import { hot } from 'react-hot-loader';
import { Footer, Header } from 'app/components';
import { NavBar } from 'app/containers/NavBar';

export const App = hot(module)(() => (
  <div>
    <Header />
    <NavBar />
    <Footer />
  </div>
));
