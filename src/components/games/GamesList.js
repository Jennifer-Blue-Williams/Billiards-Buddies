import React, { useEffect, useState } from "react"
import './GamesList.css';


export const GamesList = () => {
    const [games, setGames] = useState([])
    const currentPlayer = parseInt(localStorage.getItem("billiards_player"))

useEffect(
    () => {
        fetch("http://localhost:8088/games?_expand=venue")
            .then (res => res.json())
            .then((gamesFromAPI) => {
                setGames(gamesFromAPI)
            })
    },
    []
)

const deleteGame = (gameId) =>{
    fetch(`http://localhost:8088/games/${gameId}`, {
      method: "DELETE"
    })
    .then( () => {
      fetch("http://localhost:8088/games?_expand=venue")
      .then( (res) => res.json())
      .then( (gamesData) => setGames(gamesData))
    })
}

return (
    <>
        <h2>Your Past Games</h2>
        {
           games.map((game) => {
               return <div className="gameContainer">
                   <div className="gameRecordContainer">
                   <p key={`gameRecord--${game.id}`}>
                        You played {game.opponentName} at {game.venue.name} on {game.matchDate} and you {game.Win? "WON" : "LOST"}</p> 
                    </div>
                    <div className="gameDeleteContainer">
                     <button className="btn--orderDelete" onClick={() => deleteGame(game.id) }>Delete</button>
                    </div>
                   </div>
                }
            )
        }
    </>
)
}

