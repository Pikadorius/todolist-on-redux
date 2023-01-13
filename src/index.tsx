import React from 'react';
import './index.css';
import {createRoot} from 'react-dom/client';
import store from './redux/store';
import {Provider} from 'react-redux';
import AppRedux from './components/App/AppRedux';
import App from './components/Trash/App';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <AppRedux/>
    </Provider>
);