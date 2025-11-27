import { createBrowserRouter, redirect } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/SignIn";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import  { store } from "./app/store";
import { logout } from "./features/auth/authSlice";

const requerieAuth = () => {
  const state = store.getState()
  const isAuthenticated = state.auth.isAuthenticated
  if(!isAuthenticated){
    return redirect('/')
  }
  return null
}

const requerieGuest = () => {
  const state = store.getState()
  const isAuthenticated = state.auth.isAuthenticated
  if(isAuthenticated){
    return redirect('/profile')
  }
  return null
}
const router = createBrowserRouter([
  {
    id : 'root',
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
        loader : requerieGuest
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: <NotFound />,
        loader : requerieAuth
      },
    ]
  },
  {
    path: "/logout",
    loader() {
      store.dispatch(logout())
      return redirect('/login')
    }
  },
])

export default router
