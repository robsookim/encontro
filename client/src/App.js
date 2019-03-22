import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Form from "./pages/form";
import Login from "./pages/login";
import Home from "./pages/home";
import Meetings from "./pages/meetings";
import Users from "./pages/users";

function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/meetings" component={Meetings} />
          <Route exact path="/users" component={Users} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;