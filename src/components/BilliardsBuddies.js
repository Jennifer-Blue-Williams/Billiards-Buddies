import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./BilliardsBuddies.css";

export const BilliardsBuddies = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("billiards_player")) {
          return (
            <>
              <NavBar />
              <h1>Billiards Buddies</h1>
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);