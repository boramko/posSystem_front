import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { RecoilRoot } from 'recoil';

// Components and Pages
import App from 'components/App';
import Login from 'pages/Login';
import SignUp from 'pages/Signup';
import Main from 'pages/Main';
import Menu from 'pages/BodyContents/Menu';
import NotFound from 'pages/NotFound';
import OrderList from 'pages/BodyContents/OrderList';
import PayHistory from 'pages/BodyContents/PayHistory';
import Product from 'pages/BodyContents/Product';

// Routers and middleware
import ProtectedRouter from 'ProtectedRouter';

// Define routes
const routes = [
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/', element: <Login /> },
  { 
    path: '/main',
    element: <ProtectedRouter><Main /></ProtectedRouter>,
    children: [
      { path: '/', element: <Menu /> },
      { path: 'orderlist', element: <OrderList /> },
      { path: 'payhistory', element: <PayHistory /> },
      { path: 'product', element: <Product /> },
    ],
  },
  { path: '/test', element: <App /> },
  { path: '*', element: <NotFound /> },
];


const router = createBrowserRouter(routes);

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
