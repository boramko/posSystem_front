import Login from 'pages/Login'
import SignUp from 'pages/Signup'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import Main from 'pages/Main'
import Menu from 'pages/BodyContents/Menu'
import NotFound from 'pages/NotFound'
import OrderList from 'pages/BodyContents/OrderList'
import PayHistory from 'pages/BodyContents/PayHistory'
import Product from 'pages/BodyContents/Product'
import ProtectedRouter from 'ProtectedRouter'
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter([
  {
    path: '/login',
    
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/',
    element: <ProtectedRouter><Main/></ProtectedRouter>,
    children: [
      {
        path: '/',
        element: <Menu/>
      },
      {
        path: 'orderlist',
        element: <OrderList />
      },
      {
        path: 'payhistory',
        element: <PayHistory />
      },
      {
        path: 'product',
        element: <Product />,
      }
    ]
  },
  {
    path: '/test',
    element: <App />
  },
  {
    path: '*',
    element: <NotFound />
  }
])


const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
)
