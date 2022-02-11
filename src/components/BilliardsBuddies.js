import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./BilliardsBuddies.css";
// Here, we define the parent component, BilliardsBuddies. This function will determine if the user is a registered user, if so (meaning their credentials are saved in localStorage), they are directed to the screen with the NavBar.
export const BilliardsBuddies = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("billiards_player")) {
          return (
            <>
              <NavBar />
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