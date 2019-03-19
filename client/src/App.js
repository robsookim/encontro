import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Form from "./pages/form";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Form} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;