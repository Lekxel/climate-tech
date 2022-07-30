import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "routes";
import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <div id="App" className="App">
        <Router>
          <Routes />
        </Router>
        <ToastContainer />
      </div>
    </React.StrictMode>
  );
}

export default App;
