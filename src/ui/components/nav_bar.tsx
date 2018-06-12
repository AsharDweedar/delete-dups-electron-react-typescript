import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './home';
import About from './about';
import GetStarted from './get_started';

export default class NavBar extends React.Component<{}, NavBarStateI> {
  constructor() {
    super();
    this.state = {
      "delete?": false,
      "priorities?": true,
      "prioritiesPath": "/tmp/priorities.json",
      "refresh": false,
      // "paths": [],
      "paths": [{ path: "/Ashar/Fayez/Dweedar" }, { path: "/Aseel/Fayez/Dweedar" }],
      "ext": [{ value: ".png" }, { value: ".jpeg" }]
      // "ext": []
    }
  }
  addPath(ele: { path: string }) {
    let paths = this.state["paths"].concat([ele])
    this.setState({ ...this.state, paths })
  }
  addEXT(ele: { value: string }) {
    let ext = this.state["ext"].concat([ele])
    this.setState({ ...this.state, ext })
  }
  render() {
    return (< Router >
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo left">Logo</a>
            <ul id="nav" className="right">
              <li><a href="#!"><Link to="/about">About</Link></a></li>
              <li><a href="#!"><Link to="/home">Home</Link></a></li>
              <li><a href="#!"><Link to="/get_started">Get Started</Link></a></li>
            </ul>
          </div>
        </nav>

        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route
          path="/get_started"
          render={
            () =>
              <GetStarted
                addEXT={this.addEXT.bind(this)}
                addPath={this.addPath.bind(this)}
                {...this.state}
              />}
        />
      </div>
    </Router >
    )
  }
}
