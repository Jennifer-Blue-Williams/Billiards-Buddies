import React, { useEffect, useState } from "react"


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

return (
    <>
        <h2>Your Past Games</h2>
        {
           games.map((game) => {
               return <p key={`game--${game.id}`}>
                    You played {game.opponentName} at {game.venue.name} on {game.matchDate} and you {game.Win? "WON" : "LOST"}</p> 
                    
                }
            )
        }
    </>
)
}

