import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
// import { createBrowserHistory } from 'history';
// import { configureStore } from '../store/configureStore';

import NavBar from './components/nav_bar';
import Footer from './components/footer';


export class App extends React.Component<any, any> {
// class App extends React.Component<any, any> {
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

// prepare store
// const history = createBrowserHistory();
// const store = configureStore(history);

// ReactDOM.render(
//       <App />,
//   document.getElementById('root')
// );


// ReactDOM.render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <App />
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById('root')
// );

