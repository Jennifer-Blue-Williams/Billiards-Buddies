import React, { useEffect, useState } from "react"
import './GamesList.css';


export const GamesList = () => {
    const [games, setGames] = useState([])
  
    const currentPlayerId = parseInt(localStorage.getItem("billiards_player"))

useEffect(
    () => {
        fetch("http://localhost:8088/games?_expand=venue")
            .then (res => res.json())
            .then((gamesFromAPI) => {           
                const playersGames = gamesFromAPI.filter(
                    (game) => 
                        game.playerId === (currentPlayerId)
                )
                setGames(playersGames)
            })
        },
        [currentPlayerId]);
       
const deleteGame = (gameId) =>{
    fetch(`http://localhost:8088/games/${gameId}`, {
      method: "DELETE"
    })
    .then( () => {
      fetch("http://localhost:8088/games?_expand=venue")
      .then( (res) => res.json())
      .then( (gamesData) => {
    // Variables (like below) CAN have the same name if they are inside different code blocks (rule of SCOPE)
        const playersGames = gamesData.filter(
            (game) => 
                game.playerId === (currentPlayerId)
        )  
        setGames(playersGames)})
    })
}

return (
    <>
        <h2>Your Past Games</h2>
        {
           games.map((game) => {
               return <div key={`gameRecord--${game.id}`} className="gameContainer">
                   <div className="gameRecordContainer">
                   <p>
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

