import React from 'react';
import './index.css';
import {createRoot} from 'react-dom/client';
import store from './redux/store';
import {Provider} from 'react-redux';
import AppRedux from './ComponentsWithRedux/AppRedux';
import App from './App';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <AppRedux/>
    </Provider>
);