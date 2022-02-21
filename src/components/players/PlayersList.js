import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";

export const PlayersList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/players")
      .then((res) => res.json())
      .then((playersFromAPI) => {
        setPlayers(playersFromAPI);
      });
  }, []);

  return (
    <>
      <Container>
        <div className="main-div">
          <Row>
            <Col></Col>
            <Col>
              {players.map((player) => {
                return (
                  <p key={`player--${player.id}`}>
                    <Link to={`/games/${player.id}`}>{player.name} </Link>
                  </p>
                );
              })}
            </Col>
            <Col></Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
