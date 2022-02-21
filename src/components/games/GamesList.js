import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

export const GamesList = () => {
  const [games, setGames] = useState([]);

  const currentPlayerId = parseInt(localStorage.getItem("billiards_player"));

  useEffect(() => {
    fetch("http://localhost:8088/games?_expand=venue")
      .then((res) => res.json())
      .then((gamesFromAPI) => {
        const playersGames = gamesFromAPI.filter(
          (game) => game.playerId === currentPlayerId
        );
        setGames(playersGames);
      });
  }, [currentPlayerId]);

  const deleteGame = (gameId) => {
    fetch(`http://localhost:8088/games/${gameId}`, {
      method: "DELETE",
    }).then(() => {
      fetch("http://localhost:8088/games?_expand=venue")
        .then((res) => res.json())
        .then((gamesData) => {
          // Variables (like below) CAN have the same name if they are inside different code blocks (rule of SCOPE)
          const playersGames = gamesData.filter(
            (game) => game.playerId === currentPlayerId
          );
          setGames(playersGames);
        });
    });
  };

  return (
    <>
      <Container>
        <div className="main-div">
          {games.map((game) => {
            return (
              <div key={`gameRecord--${game.id}`}>
                <Row>
                  <Col>
                    <div>
                      <p>
                        You played {game.opponentName} at {game.venue.name} on{" "}
                        {game.matchDate} and you {game.Win ? "WON" : "LOST"}
                      </p>
                    </div>
                  </Col>
                  <Col>
                    <div className="gameDeleteContainer">
                      <button
                        className="btn--orderDelete"
                        onClick={() => deleteGame(game.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};
