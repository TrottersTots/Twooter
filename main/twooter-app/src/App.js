import React, {useState} from 'react';
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Widgets from './Components/Widgets';
import "./styles/App.css";

function App() {

  const [logged_in, setLoggedIn] = useState(false)

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
}
export default App;