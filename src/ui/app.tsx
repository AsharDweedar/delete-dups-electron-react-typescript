import * as React from 'react';
import Test from './components/test';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home !!</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About !!</h2>
  </div>
)

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <h2>Welcome to React with Typescript!</h2>
        <Router>
          <div>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/home">Home</Link></li>
            </ul>

            <hr />

            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
          </div>
        </Router>
        <Test name="AsharDweedar" age={24} address="Amman, Jordan" dob={new Date()}/>
      </div>
    );
  }
}
