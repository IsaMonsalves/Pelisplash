import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import './index.css';
import { ErrorPage } from './routes/error-page.jsx';
import Contact from './routes/contact.jsx';
// los import con llaves son aquellos sin default
import { AllMovies } from './/routes/movies.jsx';

// import {
//   BrowserRouter,
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Routes,
// } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/contacts',
    element: <Contact />,
  },
  {
    path: '/allMovies',
    element: <AllMovies />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
