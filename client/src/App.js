import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Create from "./pages/create";
import Login from "./pages/login";
import Home from "./pages/home";
import Join from "./pages/join"; 
import Meetings from "./pages/meetings";
import Users from "./pages/users";
import Meeting from "./pages/meeting";
import {createBrowserHistory} from "history";


function App() {
  const browserHistory = createBrowserHistory();

  return (
    
    <Router basename={process.env.PUBLIC_URL} history={browserHistory}>
      <div>
        <Switch>
        <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/create" component={Create} />
          <Route path="/join" component={Join} /> 
          <Route path="/meetings" component={Meetings} />
          <Route path="/users" component={Users} />
          {/* <Route path="/meeting/:id" component={Meeting} /> */}
          <Route exact path="/meeting" component={Meeting} />  

        </Switch>
      </div>
    </Router>
  );
}

export default App;