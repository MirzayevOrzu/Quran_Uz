import React from 'react';
import * as ReactRouter from "react-router-dom";
import Home from './pages/Home';
import Sura from './pages/Sura';
import './App.css';

const {
  BrowserRouter,
  Switch,
  Route,
  Link,
} = ReactRouter;


function App() {
  return (
    <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* <Link to="/sura/:id">Sura</Link> */}
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/sura/:id">
          <Sura />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
