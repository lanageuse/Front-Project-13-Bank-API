import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: 'login',
        element: <Login />,
        errorElement: <NotFound />,
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: <NotFound />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ]
  }
])

export default router
