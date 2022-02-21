import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export const GameForm = () => {
  const [venues, selectVenues] = useState([]);
  const [venue, setVenue] = useState("");
  const getVenues = () => {
    fetch("http://localhost:8088/venues")
      .then((data) => data.json())
      .then((venues) => selectVenues(venues));
  };

  useEffect(() => {
    getVenues();
  }, []);

  const [game, updateGame] = useState({
    opponentName: "",
    venue: "",
    win: true,
    matchDate: "",
  });

  const history = useHistory();

  const submitGame = (event) => {
    event.preventDefault();
    // preventDefault stops the browser from automatically submitting the form unti the button is clicked

    const newGame = {
      playerId: parseInt(localStorage.getItem("billiards_player")),
      opponentName: game.opponentName,
      venueId: parseInt(game.venue),
      Win: JSON.parse(game.win),
      matchDate: game.matchDate,
    };

    // Parse the data with JSON.parse(), and the data becomes a JavaScript object.

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    };

    // The JSON.stringify() method converts a JavaScript object or value to a JSON }string

    return fetch("http://localhost:8088/games", fetchOption).then(() => {
      history.push("/mygames");
    });
  };

  return (
    <form>
      <div className="main-div">
        <fieldset>
          <div className="">
            <Row>
              <h2 className="">Record Your Game</h2>
              <Col></Col>
              <Col>
                <label htmlFor="opponentName">Opponent Name:</label>
                <input
                  onChange={(evt) => {
                    const copy = { ...game };
                    copy.opponentName = evt.target.value;
                    updateGame(copy);
                  }}
                  required
                  autoFocus
                  type="text"
                  id="opponentName"
                  className="form-control"
                  placeholder="Who did you play?"
                />
              </Col>
              <Col></Col>
            </Row>
          </div>

          <div>
            <Row>
              <Col></Col>
              <Col>
                <select
                  className="form-control"
                  name={venues}
                  id={venues}
                  onChange={(evt) => {
                    const copy = { ...game };
                    copy.venue = evt.target.value;
                    updateGame(copy);
                    setVenue(evt.target.value);
                  }}
                >
                  <option value={0}>Select a Venue</option>
                  {venues.map((venue) => (
                    <option
                      id={`venue--${venue.id}`}
                      key={venue.id}
                      value={venue.id}
                    >
                      {venue.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col></Col>
            </Row>
          </div>

          <div>
            <Row>
              <Col></Col>
              <Col>
                <select
                  onChange={(evt) => {
                    const copy = { ...game };
                    copy.win = evt.target.value;
                    updateGame(copy);
                  }}
                  name="win"
                  id="win"
                >
                  <option value={0}>Select Result</option> {" "}
                  <option value="true">WON</option> {" "}
                  <option value="false">LOST</option>
                </select>
              </Col>
              <Col></Col>
            </Row>
          </div>

          <div className="form-group">
            <Row>
              <Col></Col>
              <Col>
                <label htmlFor="date">Date:</label>
                <input
                  onChange={(evt) => {
                    const copy = { ...game };
                    copy.matchDate = evt.target.value;
                    updateGame(copy);
                  }}
                  type="date"
                  max="2022-02-22"
                  id="date"
                  className="form-control"
                />
              </Col>
              <Col></Col>
            </Row>
          </div>
        </fieldset>

        <div className="ball-button" onClick={submitGame}>
          <button
            className="inner-ball"
            type="submit"
            venue={venue}
            disabled={!venue}
          >
            Record
          </button>
        </div>
      </div>
    </form>
  );
};
