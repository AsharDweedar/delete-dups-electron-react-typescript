import * as React from 'react';
import NavBar from './components/nav_bar';
import {TextInput} from 'belle'

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <h2>Welcome to React with Typescript!</h2>
        <TextInput defaultValue="Update here and see how the input grows …" />
        <NavBar />
      </div>
    );
  }
}
