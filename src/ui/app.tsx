import * as React from 'react';
import NavBar from './components/nav_bar';
import Footer from './components/footer';

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <div className="container">
          <h2>Welcome to Delete Dups App!</h2>
        </div>
        <NavBar />
        <Footer />
      </div>
    );
  }
}
