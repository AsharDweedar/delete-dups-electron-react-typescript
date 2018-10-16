import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home } from 'app/containers/Home';
import { GetStarted } from 'app/containers/GetStarted';
import { About } from 'app/containers/About';
import { Navbar, NavItem } from 'react-materialize';

export namespace NavBar {
  export interface Props {}
}
export class NavBar extends React.Component<NavBar.Props> {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar brand="logo" right>
              <NavItem>
                <Link to="/home">HOME</Link>
              </NavItem>
              <NavItem>
                <Link to="/about">ABOUT</Link>
              </NavItem>
              <NavItem>
                <Link to="/get_started">Getting started</Link>
              </NavItem>
            </Navbar>
            <Route path="/about" component={About} />
            <Route path="/home" component={Home} />
            <Route path="/get_started" component={GetStarted} />
          </div>
        </Router>
      </div>
    );
  }
}
