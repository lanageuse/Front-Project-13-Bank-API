import "./App.css"
import { Counter } from "./features/counter/Counter"
import { Navigation } from "./UI/navBar/NavBar"
import { Quotes } from "./features/quotes/Quotes"
import MainLayout from "./layouts/MainLayout"
import FeaturesLayout from "./layouts/FeaturesLayout"
import Hero from "./UI/hero/Hero"
import Footer from "./UI/footer/Footer"
import Login from "./features/auth/Login"
import Profile from "./features/auth/Profile"

export const App = () => (
  <div className="App">
    <Navigation />
    <MainLayout>
      <Hero />
      <FeaturesLayout/>
      <Login/>
      <Profile/>
    </MainLayout>
    <Footer/>
    {/* <header className="App-header">
      <Counter />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Quotes />
      <span>
        <span>Learn </span>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
        <span>, </span>
        <a
          className="App-link"
          href="https://redux.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux
        </a>
        <span>, </span>
        <a
          className="App-link"
          href="https://redux-toolkit.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux Toolkit
        </a>
        <span>, </span>
        <a
          className="App-link"
          href="https://react-redux.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Redux
        </a>
        ,<span> and </span>
        <a
          className="App-link"
          href="https://reselect.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reselect
        </a>
      </span>
    </header> */}
  </div>
)
