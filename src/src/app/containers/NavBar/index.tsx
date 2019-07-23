import * as React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Home } from "app/containers/Home";
import { GetStarted } from "app/containers/GetStarted";
import { Navbar, NavItem } from "react-materialize";

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
                <Link to="/GetStarted">Getting started</Link>
              </NavItem>
              <NavItem>
                <Link to="/none-existing-route">Some Where Else</Link>
              </NavItem>
            </Navbar>
            <Route path="/home" component={Home} />
            <Route path="/GetStarted" component={GetStarted} />
            <Route path="^(?!.*(GetStarted|home)).*$" component={Home} />
            <Route
              path="/*"
              exact
              strict
              render={({ match }) => {
                console.log("match ...........");
                console.log(match);
                if (/^(?!.*(GetStarted|home)).*$/.test(match.url)) {
                  return <Home />;
                }
                return null;
              }}
            />
          </div>
        </Router>
      </div>
    );
  }
}
