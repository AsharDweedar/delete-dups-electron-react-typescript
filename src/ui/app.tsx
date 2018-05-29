import * as React from 'react';
import NavBar from './components/nav_bar';
import Footer from './components/footer';

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <h2>Welcome to Delete Dups App!</h2>
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
