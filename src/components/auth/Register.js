import React, { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const [player, setPlayer] = useState({});
  const conflictDialog = useRef();

  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/players?email=${player.email}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch("http://localhost:8088/players", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(player),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("billiards_player", createdUser.id);
              history.push("/games/create");
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  const updatePlayer = (evt) => {
    const copy = { ...player };
    copy[evt.target.id] = evt.target.value;
    setPlayer(copy);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <div className="main-div">
        <form onSubmit={handleRegister}>
          <h1 className="h3 mb-3 font-weight-normal">
            Please Register for Billiards Buddies
          </h1>
          <fieldset>
            <label htmlFor="name"> Full Name </label>
            <input
              onChange={updatePlayer}
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </fieldset>

          <fieldset>
            <label htmlFor="email"> Email address </label>
            <input
              onChange={updatePlayer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </fieldset>
          <fieldset>
            <button type="submit"> Register </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
