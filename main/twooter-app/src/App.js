import React from 'react';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import "./App.css";

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