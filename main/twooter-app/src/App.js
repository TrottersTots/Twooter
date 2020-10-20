import React from 'react';
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Widgets from './Components/Widgets';
import "./styles/App.css";

function App() {
  return (
    // BEM convention
    <div className="app">

      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets />

    </div>

  );
}

export default App;