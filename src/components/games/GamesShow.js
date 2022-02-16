import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Input, Container } from "react-bootstrap";
import "./GamesList.css";

export const GamesShow = () => {
  const [playerGames, setPlayerGames] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // json server database query
    fetch(`http://localhost:8088/games?playerId=${id}&_expand=venue`)
      .then((res) => res.json())
      .then((gamesFromAPI) => {
        console.log(gamesFromAPI);

        setPlayerGames(gamesFromAPI);
      });
  }, [id]);

  return (
    <>
      <Container>
        {/* <Row>
          <Col></Col>
          <Col>
            <h2>Past Games</h2>
          </Col>
          <Col></Col>
        </Row> */}
        {playerGames.map((game) => {
          return (
            <div key={`gameRecord--${game.id}`} className="gameContainer">
              <div className="gameRecordContainer">
                <p>
                  You played {game.opponentName} at {game?.venue?.name} on{" "}
                  {game.matchDate} and you {game.Win ? "WON" : "LOST"}
                </p>
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
};
