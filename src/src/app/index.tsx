import * as React from 'react';
// import { Route, Switch } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { App as TodoApp } from 'app/containers/App';
import { Other } from 'app/containers/secondRout';
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
            {/* <li><a href="#!"><Link to="/get_started">Get Started</Link></a></li> */}
          </ul>
        </div>
      </nav>

      <Route path="/home" component={TodoApp} />
      <Route path="/about" component={Other} />
      {/* <Route
        path="/get_started"
        render={
          () =>
            <GetStarted
              addEXT={this.addEXT.bind(this)}
              ExtCaseChange={this.ExtCaseChange.bind(this)}
              addPath={this.addPath.bind(this)}
              {...this.state}
            />}
      /> */}
    </div>
  </Router>
));

// export const App = hot(module)(() => (
//   <Switch>
//     <Route path="/hi" component={Other}> hi there </Route>
//     <Route path="/" component={TodoApp}> hi here </Route>
//   </Switch>
// ));
