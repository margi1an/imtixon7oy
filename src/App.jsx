import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home, Login, Register } from "./pages";
import MainLayout from "./layouts/MainLayout";
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { ProtectedRoutes } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { login, isAuthChange } from "./app/userSlice";
import Carts from "./pages/Carts";
import Cart from "./pages/Cart";
import Chart from "./pages/Chart";
import Product from "./pages/Product";
import ErrorPage from './components/ErrorPage'
import { ClipLoader } from "react-spinners";
import UpdateCar from "./pages/UptadeCar";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthReady } = useSelector((state) => state.user);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout></MainLayout>
        </ProtectedRoutes>
      ),
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
        {
          path:'/cart',
          element: <Cart></Cart>
        },
        {
          path:'/update/:id',
          element: <UpdateCar></UpdateCar>
        },
        {
          path:'/carts',
          element: <Carts></Carts>
        },
        {
          path:'/chart',
          element: <Chart></Chart>
        },
        {
          path:'/product/:id',
          element: <Product></Product>
        }
      ],
      
    },
    {
      path: "/login",
      element: user ? <Navigate to="/"></Navigate> : <Login></Login>,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/"></Navigate> : <Register></Register>,
      action: RegisterAction,
    },

  ]);
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(isAuthChange())
    });
  }, []);

  return (
    <>
      {isAuthReady ? (
        <RouterProvider router={routes}></RouterProvider>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <ClipLoader color={"#123abc"} loading={true} size={150} />
        </div>
      )}
    </>
  );
}

export default App;
