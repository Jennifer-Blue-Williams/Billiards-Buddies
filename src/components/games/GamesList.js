import React, { useEffect, useState } from "react"
import './GamesList.css';


export const GamesList = () => {
    const [games, setGames] = useState([])
    // We define our component's state ( with an intial value of [])
  // and we get a function for changing that state by calling useState()
    const currentPlayerId = parseInt(localStorage.getItem("billiards_player"))

    // We call useEffect() to tell it a function to call once the HTML of the component is in the DOM
useEffect(
    // useEffect (event listener) calls this function for us to get the games/venues data from the db and update the games state. (The expand is always singular)
    () => {
        fetch("http://localhost:8088/games?_expand=venue")
            .then (res => res.json())
            .then((gamesFromAPI) => {           
                // gamesFromAPI is the variable AND a parameter in this function
                const playersGames = gamesFromAPI.filter(
                    (game) => 
                        game.playerId === (currentPlayerId)
                )
                setGames(playersGames)
            })
        },
        []
        )
        // playersGames is the new variable that returns the filtered version of gamesFromAPI and sets the game.playerId equal to currentPlayerId

const deleteGame = (gameId) =>{
    fetch(`http://localhost:8088/games/${gameId}`, {
      method: "DELETE"
    })
    .then( () => {
      fetch("http://localhost:8088/games?_expand=venue")
      .then( (res) => res.json())
      .then( (gamesData) => {
    // Variables (like below) CAN have the same name if they are inside different code blocks (SCOPE)
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

