import React from 'react';
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Widgets from './Components/Widgets';
import "./styles/App.css";

function App({logged_in}) {
  return (
    // BEM convention
    <div className="app">

      <Sidebar logged_in={logged_in}/>

      {/* Feed */}
      <Feed logged_in={logged_in}/>

      {/* Widgets */}
      <Widgets logged_in={logged_in}/>

    </div>

  );
}
App.defaultProps = {
  logged_in : false
}
export default App;