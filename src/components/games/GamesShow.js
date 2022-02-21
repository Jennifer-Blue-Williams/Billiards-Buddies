import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "./GamesShow.css";

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
    <Row>
      <div id="games-main-div">
        <Col>
          <div>
            {/* <h2>Past Games</h2> */}
            {playerGames.map((game) => {
              return (
                <div key={`gameRecord--${game.id}`} className="">
                  <div className="">
                    <p className="game-text">
                      Played against {game.opponentName} at {game?.venue?.name}{" "}
                      on {game.matchDate} and you {game.Win ? "WON" : "LOST"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </div>
    </Row>
  );
};
