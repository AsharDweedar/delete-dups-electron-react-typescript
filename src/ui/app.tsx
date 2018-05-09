import * as React from 'react';
import NavBar from './components/nav_bar';

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <h2>Welcome to React with Typescript!</h2>
        <NavBar />
      </div>
    );
  }
}
