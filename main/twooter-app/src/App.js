import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import "./styles/App.css";

//different pages that will show in the center column
import Home from './Components/Home';
import Explore from './Components/Explore';
import Messages from './Components/Messages';
import More from './Components/More';
import Profile from './Components/Profile';

//
import Sidebar from './Components/Sidebar';
import Widgets from './Components/Widgets';





function App() {
  //things that potentially need to be shared by the entire website
  const [logged_in, setLoggedIn] = useState(false)
  //set logged in to true if the route returns an id

  return (
    <div className="app">
      <Router>
          {/*Show sidebar for all pages*/}
          <Route path='/'
            render={(props) => (
              <Sidebar {...props} logged_in={logged_in} setLoggedIn={setLoggedIn}/>            
            )}
          />
          {/*Home Page*/}
        <Switch>{/* Switch means we want to only show ONE of these */}
          <Route exact path='/'
              render={(props) => (
                <Home {...props} logged_in={logged_in} setLoggedIn={setLoggedIn}/>
              )}
          />
          {/*Explore Page*/}
          <Route exact path='/explore'
              render={(props) => (
                <Explore {...props} logged_in={logged_in} setLoggedIn={setLoggedIn}/>
              )}
          />
          {/*Messages Page*/}
          <Route exact path='/messages'
              render={(props) => (
                <Messages {...props} logged_in={logged_in}/>
              )}
          />
          {/*More Page*/}
          <Route exact path='/more'
              render={(props) => (
                <More {...props} logged_in={logged_in}/>
              )}
          />
          {/*Profile Page*/}
          <Route excat path='/profile'
              render={(props) => (
                <Profile {...props} logged_in={logged_in}/>
              )}
          />
          {/*leave at bottom 404 Page*/}
          <Route path='/'
              render={(props) => (
                <h2>404 page not found</h2>
              )}
          />
        </Switch>
      </Router>
      <Widgets logged_in={logged_in}/>
    </div>
  );
}
App.defaultProps = {
}
export default App;