import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Login from "./login-page/login"
import Register from './login-page/register';
import { UserContextProvider } from './context/UserContext';
import LogsPage from './components/Logs';
import Estoque from './components/Estoque';
import firebase from "./components/Firebase";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/logs",
    element: <LogsPage db={firebase.firestore()}/>
  },
  {
    path: "/",
    element: <Estoque db={firebase.firestore()}/>,
  },
]);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);


