import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Home from '../home';
import About from '../about';
import GetStarted from '../get_started';

const NavBarHTML = () => (
    <Router>
        <div>
            Navigation Bar
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/getStarted">Get Started</Link></li>
            </ul>

            <hr />

            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/getStarted" render={() => <GetStarted something="there"/>}/>
        </div> 
    </Router>
)

export default NavBarHTML