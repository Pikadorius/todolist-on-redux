import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import store from './redux/store';

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);

// function that renders App
const rerender = () => {
    root.render(<App  state={store.getState()} dispatch={store.dispatch.bind(store)}/>);
}

// first render
rerender()
// send observer, that will rerender App if state will be changed
store.subscribe(rerender)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

