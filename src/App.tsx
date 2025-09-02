import { RouterProvider } from "react-router"
import "./App.css"
import router from "./routes"

export const App = () => (
  <div className="App">
    <RouterProvider router={router}/>
  </div>
)
