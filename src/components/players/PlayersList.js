import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const PlayersList = () => {
    const [players, setPlayers] = useState([])

  
useEffect(
    () => {
        fetch("http://localhost:8088/players")
            .then (res => res.json())
            .then((playersFromAPI) => {
                setPlayers(playersFromAPI)
            })
    },
    []
)


return (
    <>
        {
            players.map(
                (player) => {
                    return <p key={`player--${player.id}`}>
                    <Link to={`/games/${player.id}`}>{player.name} </Link></p>
                }
            )
        }
    </>
)}