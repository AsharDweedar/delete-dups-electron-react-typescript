import * as React from 'react';
// import { Route, Switch } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { App as TodoApp } from 'app/containers/App';
import { Home } from 'app/containers/Home';
import { GetStarted } from 'app/containers/GetStarted';
import { About } from 'app/containers/About';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Router>
    <div>
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo left">
            Logo
          </a>
          <ul id="nav" className="right">
            <li>
              <a href="#!">
                <Link to="/about">About</Link>
              </a>
            </li>
            <li>
              <a href="#!">
                <Link to="/home">Home</Link>
              </a>
            </li>
            <li>
              <a href="#!">
                <Link to="/get_started">Get Started</Link>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <Route path="/about" component={About} />
      <Route path="/home" component={Home} />
      <Route path="/get_started" component={GetStarted} />
    </div>
  </Router>
));
