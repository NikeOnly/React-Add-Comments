import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {createHashHistory} from 'history';
import routes from './routes/index';
import Store from './store';

const appHistory = useRouterHistory(createHashHistory)();
const history = syncHistoryWithStore(appHistory, Store);

ReactDOM.render((
    <Provider store={Store}>
        <Router history={history}>
            {routes(Store)}
        </Router>
    </Provider>
), document.getElementById('test-app'));
