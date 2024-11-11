import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { GlobalProvider } from './components/GlobalContext'; // Importa el proveedor global
import 'bootstrap/dist/css/bootstrap.min.css';


/* Styles */
import './index.css';

/* Pages */
import Home from './pages/Home';
import Portada from './pages/Portada';
import Watch from './pages/Watch';
import Random from './pages/Random';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GlobalProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p" element={<Portada />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/aleatorio" element={<Random />} />
      </Routes>
    </Router>
  </GlobalProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
