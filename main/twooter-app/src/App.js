import React, {useState} from 'react';
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
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

      {/* Feed */}
      <Feed logged_in={logged_in} setLoggedIn={setLoggedIn}/>

      {/* Widgets */}
      <Widgets logged_in={logged_in}/>

    </div>

  );
}
App.defaultProps = {
}
export default App;