import React from 'react';
import './index.css';
import {createRoot} from 'react-dom/client';
import store from './redux/store';
import {Provider} from 'react-redux';
import App from './components/App/App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Todolists from './components/Features/Todolists/Todolists';
import {Login} from './components/Features/Login/Login';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <h1>ERROR 404</h1>,
        children: [
            {
                path: "/",
                element: <Todolists />,
            },
            {
                path: "/login",
                element: <Login/>
            }
        ]
    }
])

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);