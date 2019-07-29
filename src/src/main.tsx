import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createHashHistory } from 'history';
import { configureStore } from './app/store';
import { App } from './app';
import { AppContainer } from 'react-hot-loader';

// prepare store
const history = createHashHistory();
const store = configureStore(history);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

// const { remote } = require('electron');
// const { Menu, MenuItem } = remote;
// const menu = new Menu();

// menu.append(new MenuItem({ role: 'about' }));
// menu.append(new MenuItem({ type: 'separator' }));
// menu.append(
//   new MenuItem({
//     role: 'services',
//     submenu: [
//       {
//         label: 'customized event',
//         click() {
//           console.log('customized event clicked, this goes to the terminal');
//         },
//       },
//     ],
//   })
// );
// menu.append(new MenuItem({ type: 'separator' }));
// menu.append(new MenuItem({ role: 'hide' }));
// menu.append(new MenuItem({ role: 'hideothers' }));
// menu.append(new MenuItem({ role: 'unhide' }));
// menu.append(new MenuItem({ type: 'separator' }));
// menu.append(new MenuItem({ role: 'quit' }));
// menu.append(
//   new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true })
// );

// window.addEventListener(
//   'contextmenu',
//   (e: any) => {
//     e.preventDefault();
//     menu.popup({ window: remote.getCurrentWindow() });
//   },
//   false
// );

// if (module.hot) { module.hot.accept(render); }
