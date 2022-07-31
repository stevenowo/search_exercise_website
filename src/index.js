// this file connects the app to the dom (document object model)
// this is so we can interact with the page

import React from 'react';
import ReactDOM from 'react-dom';
import App from'./App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
