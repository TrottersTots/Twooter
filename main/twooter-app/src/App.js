import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom';
import Sidebar from './Components/Sidebar';
//different pages that will show in the center column
import Feed from './Components/Feed';
import Explore from './Components/Explore';
import Notifications from './Components/Notifications';
import Messages from './Components/Messages';
import Settings from './Components/Settings';
//
import Widgets from './Components/Widgets';
import "./styles/App.css";


function App() {

  const [logged_in, setLoggedIn] = useState(false)

  //set logged in to true if the route returns an id

  //async function getsession yadayadayada

  return (
    // BEM convention

    //call a route '/' that will get our user id if we previously logged in (session exists)

    <div className="app">
      <Sidebar logged_in={logged_in}/>

      <Router>

        <Switch>
          <Route exact path='/'>
            <Feed logged_in={logged_in} setLoggedIn={setLoggedIn}/>
          </Route>
          <Route exact path='/explore'>
            <Explore logged_in={logged_in} setLoggedIn={setLoggedIn}/>
          </Route>
          <Route exact path='/notifications'>
            <Notifications />
          </Route>
          <Route exact path='/messages'>
            <Messages/>
          </Route>
          <Route exact path='/more'>
            <Settings />
          </Route>        
        </Switch>

      </Router>

      {/* Widgets */}
      <Widgets logged_in={logged_in}/>

    </div>

  );
}
App.defaultProps = {
}
export default App;