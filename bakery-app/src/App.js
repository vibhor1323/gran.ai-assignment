import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BakeryApp from "./components/bakery-home/bakery-home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BakeryApp} />  
         {/* <Route exact path="/cart" component={} />   */}
      </Switch>
    </Router>
  );
}
