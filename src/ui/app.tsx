import * as React from 'react';
import NavBar from './components/nav_bar';
import Footer from './components/footer';

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <h3>Welcome to Delete Dups App!</h3>
          </div>
        </header>
        <main>
          <NavBar />
        </main>
        <Footer />
      </div>
    );
  }
}
