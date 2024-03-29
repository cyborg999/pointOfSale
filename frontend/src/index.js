import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Test from "./pages/Test";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <App />
    {/* <Test /> */}
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
