// import React, { useEffect, useState } from "react"
// import { Link } from "react-router-dom";

// export const PlayersList = () => {
//     const [players, setPlayers] = useState([])

// useEffect(
//     () => {
//         fetch("http://localhost:8088/players")
//             .then (res => res.json())
//             .then((playersFromAPI) => {
//                 setPlayers(playersFromAPI)
//             })
//     },
//     []
// )

// return (
//     <>
//         {
//             players.map(
//                 (player) => {
//                     return <p key={`player--${player.id}`}>
//                     <Link to={`/players/${player.id}`}>{player.name} </Link></p>
//                 }
//             )
//         }
//     </>
// )
// }    I DO NOT NEED THIS MODULE, BU IT MIGHT COME IN HANDY FOR A STRETCH!!!