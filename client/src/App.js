import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Create from "./pages/create";
import Login from "./pages/login";
import Home from "./pages/home";
import Join from "./pages/join";
import Meeting from "./pages/meeting"; 
import Users from "./pages/users";

function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/meeting" component={Meeting} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;