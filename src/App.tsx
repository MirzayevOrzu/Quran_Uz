import React from 'react';
import { fetchReciters, selectReciters, selectRStatus } from './features/reciterSlice';
import { useAppDispatch, useAppSelector} from './app/hooks';

import * as ReactRouter from "react-router-dom";
import Home from './pages/Home';
import Sura from './pages/Sura';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import './App.css';

const {
  BrowserRouter,
  Switch,
  Route,
  Link,
} = ReactRouter;

const useStyles = makeStyles((theme: Theme) => createStyles({
  '@global': {
    body: {
      margin: 0,
      
    }
  },
  root: {
    backgroundColor: theme.palette.success.light
  }
}))

function App() {
  const classes = useStyles();
  const reciters = useAppSelector(selectReciters);
  const recitersStatus = useAppSelector(selectRStatus);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (recitersStatus === 'idle') {
      dispatch(fetchReciters());
    }
  }, [recitersStatus, dispatch])

  console.log(reciters);

  return (
    <BrowserRouter>
    <div className={classes.root}>
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
