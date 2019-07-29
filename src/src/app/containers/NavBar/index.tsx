import * as React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Logo from "../../../assets/logo.png";
import { Home } from "app/containers/Home";
import { GetStarted } from "app/containers/GetStarted";
import { Navbar, NavItem } from "react-materialize";
// import Icon from "antd/lib/icon";

export namespace NavBar {
  export interface Props {}
}
export class NavBar extends React.Component<NavBar.Props> {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar brand={Logo} right>
              <NavItem>
                <Link to="/home">HOME</Link>
              </NavItem>
              <NavItem>
                <Link to="/GetStarted">Getting started</Link>
              </NavItem>
            </Navbar>
            <Route path="/home" component={Home} />
            <Route path="/GetStarted" component={GetStarted} />
            <Route
              path="/*"
              render={({ match }) => {
                console.log("match ...........", match);
                console.log(match.url);
                if (/^(?!.*(GetStarted|home)).*$/.test(match.url)) {
                  console.log("match.url ", match.url, "matches: no path");
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
