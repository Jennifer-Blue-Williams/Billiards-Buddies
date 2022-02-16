import React, { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("");
  const existDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/players?email=${email}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists) {
        localStorage.setItem("billiards_player", exists.id);
        history.push("/mygames");
      } else {
        existDialog.current.showModal();
      }
    });
  };

  return (
    <div className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <div>
        <Row>
          <Col>
            <span className="shiny">
              <h1 className="BBHeader inner-shiny">
                <span className="BB">B</span>illiards{" "}
                <span className="BB">B</span>uddies
              </h1>
            </span>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col lg={8}>
            <form className="form--login" onSubmit={handleLogin}>
              <Row>
                <Col>
                  <h2>Please sign in</h2>
                </Col>
              </Row>
              <fieldset>
                <Row>
                  <Col></Col>
                  <Col>
                    <input
                      type="email"
                      onChange={(evt) => set(evt.target.value)}
                      className="form-control"
                      id="email-input"
                      placeholder="Email address"
                      required
                      autoFocus
                    />
                  </Col>
                  <Col></Col>
                </Row>
              </fieldset>
              <fieldset>
                <Row>
                  <Col></Col>
                  <Col>
                    <div className="ball-button">
                      <button
                        className="inner-ball"
                        href="/mygames"
                        type="submit"
                      >
                        8
                      </button>
                    </div>
                  </Col>
                  <Col></Col>
                </Row>
              </fieldset>
              <Row>
                <Col>
                  <div className="link-container">
                    <Link id="link-register" to="/register">
                      Not my buddy yet? Click here now!
                    </Link>
                  </div>
                </Col>
              </Row>
            </form>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
};
