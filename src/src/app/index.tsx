import * as React from 'react';
import { hot } from 'react-hot-loader';
import { LocalFooter } from 'app/components';
import { NavBar } from 'app/containers/NavBar';

export const App = hot(module)(() => <div>
           <NavBar />
           <LocalFooter />
         </div>);
