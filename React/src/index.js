import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Home from './pages/Home';
import Portada from './pages/Portada';
import Watch from './pages/Watch';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/p" element={<Portada />} />
      <Route path="/watch" element={<Watch />} />
    </Routes>
  </Router>
);


// // public/service-worker.js
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('v1').then((cache) => {
//       return cache.addAll([
//         '/',
//         '/index.html',
//         '/icon-192x192.png',
//         '/icon-512x512.png',
//         '/static/js/bundle.js', // Asegúrate de incluir tus archivos estáticos
//       ]);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
