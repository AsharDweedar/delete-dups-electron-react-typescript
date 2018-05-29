import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Home from './home';
import About from './about';
import GetStarted from './get_started';

const NavBar = () => (
    <Router>
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#!"><Link to="/about">About</Link></a></li>
                        <li><a href="#!"><Link to="/home">Home</Link></a></li>
                        <li><a href="#!"><Link to="/getStarted">Get Started</Link></a></li>
                    </ul>
                </div>
            </nav>

            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/getStarted" render={() => <GetStarted />} />
        </div>
    </Router>
)

export default NavBar