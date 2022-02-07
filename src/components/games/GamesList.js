import React, { useEffect, useState } from "react"
import './GamesList.css';


export const GamesList = () => {
    const [games, setGames] = useState([])
    
    // We define the component's state ( with an intial value of [])
  // and we get a function for changing that state by calling useState()
    const currentPlayerId = parseInt(localStorage.getItem("billiards_player"))

    // We call useEffect() to give it a function to call once the HTML of the component is in the DOM
useEffect(
    // useEffect (event listener) calls this function for us to get the games/venues data from the db and update the games state. (The expanded element is always singular)
    () => {
        fetch("http://localhost:8088/games?_expand=venue")
            .then (res => res.json())
            // Above converts json encoded string into javaScript
            .then((gamesFromAPI) => {           
                // gamesFromAPI is BOTH the variable AND a parameter in this function
                const playersGames = gamesFromAPI.filter(
                    (game) => 
                        game.playerId === (currentPlayerId)
                )
                setGames(playersGames)
            })
        },
        [currentPlayerId]
        // Empty dependency array ([] above) only reacts to JSX initial rendering
        )
        // playersGames is the new variable that returns the filtered version of gamesFromAPI and sets the game.playerId equal to currentPlayerId, which will now return only the games unique to that player. 

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

