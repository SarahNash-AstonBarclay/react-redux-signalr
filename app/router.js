import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {history} from './store.js';
import App from './components/App';
import Weather from './components/Weather';
import Stocks from './components/Stocks';

const router = (
    <Router history={history}>
        <Route path='/' component={App}>
            <IndexRoute component={Stocks}/>
            <Route path='weather' component={Weather}/>
        </Route>
    </Router>
);
export {router};
