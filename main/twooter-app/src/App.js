import React, {useState, useEffect} from 'react';
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

//MAX LENGTHS:
//displayname - 12 char
//username - 25 char
//bio - 50 char

function App() {
  //things that potentially need to be shared by the entire website
  const [logged_in, setLoggedIn] = useState(false)
  //set logged in to true if the route returns an id
  const [userData, setUD] = useState({})
  
  const [twoots, setTwoots] = useState({});
  //useEffect(() => {  
  //  setUserData()
  //}, [logged_in]);

  async function setUserData() {
    let ud = {displayname: '',
              username: '',
              email: '',
              dob: '',
              bio: '',
              avatar: '',
              verified: '',
              followers: '',
              following: '',}

    await fetch('api/get_userdata/')
    .then(response => response.json())
    .then(data => {
      ud.displayname = data.displayname;
      ud.username = data.username;
      ud.email = data.email;
      ud.dob = data.dob;
      ud.bio = data.bio;
      ud.avatar = data.avatar;
      ud.verified = data.verified;
      ud.following = data.following;
      ud.followers = data.followers;
      setUD(ud);
    });
    console.log(userData);
  }

  async function getLoginState(){ //called when the App is loaded
    const response = await fetch('/api/',{
        method: 'GET',
      }
    );
    

    switch(response.status)
    {
      case(200):
        setLoggedIn(true);
        break;
      case(500):
        setLoggedIn(false);
        break;
      default:
        setLoggedIn(false);
        return;
    }
    setUserData(); // <-- problem
  }
  
  return (
    <div className="app" onLoad={() => getLoginState()}>
      <Router>
          {/*Show sidebar for all pages*/}
          <Route path='/'
            render={(props) => (
              <Sidebar {...props} logged_in={logged_in} setLoggedIn={setLoggedIn} userData={userData} twoots={twoots} setTwoots={setTwoots}/>            
            )}
          />
          {/*Home Page*/}
        <Switch>{/* Switch means we want to only show ONE of these */}
          <Route exact path='/'
              render={(props) => (
                <Home {...props} logged_in={logged_in} setLoggedIn={setLoggedIn} userData={userData} twoots={twoots} setTwoots={setTwoots}/>
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
                <Profile {...props} logged_in={logged_in} userData={userData}/>
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