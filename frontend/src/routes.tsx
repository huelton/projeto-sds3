import React from "react";
import  { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";

const  Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/dashboard" exact>
                <DashBoard />
            </Route>
        </Switch>    
    </BrowserRouter>
  );
}

export default Routes;