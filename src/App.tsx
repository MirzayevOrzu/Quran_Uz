import React, { useState } from 'react';
import { fetchReciters, selectReciters, selectRStatus } from './features/reciterSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';

import * as ReactRouter from "react-router-dom";
import Home from './pages/Home';
import Sura from './pages/Sura';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
  },
  list: {
    width: 250,
  },
}))

function App() {
  const classes = useStyles();
  const reciters = useAppSelector(selectReciters);
  const recitersStatus = useAppSelector(selectRStatus);
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  React.useEffect(() => {
    if (recitersStatus === 'idle') {
      dispatch(fetchReciters());
    }
  }, [recitersStatus, dispatch])

  // const toggleDrawer = () => setSidebarOpen(!sidebarOpen);
  const toggleDrawer = () => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSidebarOpen(!sidebarOpen);
  };

  const list = () => (
    <div
      className={classes.list} 
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

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
        <Button onClick={toggleDrawer}>SideBar</Button>
        <Drawer 
        variant="temporary" 
        anchor='left' 
        open={sidebarOpen} 
        onClose={toggleDrawer}
        >
          {/* <ul>
            <li>Reciter</li>
            <li>Translation</li>
            <li>Theme</li>
          </ul> */}
          {list}
        </Drawer>

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
