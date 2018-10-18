import * as React from 'react';
import { hot } from 'react-hot-loader';
import { LocalFooter, Header } from 'app/components';
import { NavBar } from 'app/containers/NavBar';

export const App = hot(module)(() => <div>
           <Header />
           <NavBar />
           <LocalFooter />
         </div>);
