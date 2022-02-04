import React, { useState } from "react"
import { useHistory } from "react-router-dom"


export const GameForm = () => {
    const [game, updateGame] = useState({
        opponentName: "",
        venue: "",
        win: false,
        matchDate: ""
    })

    const history = useHistory()
    const submitGame = (event) => {
        event.preventDefault()
        // preventDefault stops the browser from automatically submitting the form unti the button is clicked
    
    const newGame = {
        playerId: parseInt(localStorage.getItem("billiards_player")),
        opponentName: game.opponentName,
        venueId: parseInt(game.venue),
        Win: JSON.parse(game.win),
        matchDate: game.matchDate
    }    

    const fetchOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGame)
    }

    return fetch("http://localhost:8088/games", fetchOption)
        .then(() => {
            history.push("/games")
        })
    }

<div>
    <button onClick={() => history.push("/game/create")}>Record Game</button>
</div> 
    // History directs you to a specific URL, it is used for navigation

    return (
        <>
        <form className="gameForm">
            <h2 className="gameForm__title">Record Your Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="opponentName">Opponent Name:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...game}
                                copy.opponentName = evt.target.value
                                updateGame(copy)
                            }
                        }

                        required autoFocus
                        type="text" id="opponentName"
                        className="form-control"
                        placeholder="Who did you play?"/>
                </div>

                <div>
                <select onChange={
                            (evt) => {
                                const copy = {...game}
                                copy.venue = evt.target.value
                                updateGame(copy)
                            }
                        }
                 name="venue" id="venue">
                   <option value="1">JOB's Billiards</option>
                   <option value="2">Cobra</option>
                   <option value="3">H-Cues Upsatirs Pool Room</option>
                   <option value="4">Mickey's Tavern</option>
                </select>
                </div>

                <div>
                <select onChange={
                            (evt) => {
                                const copy = {...game}
                                copy.win = evt.target.value
                                updateGame(copy)
                            }
                        }
                name="win" id="win">
                   <option value="true">WON</option>
                   <option value="false">LOST</option>
                </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input onChange={
                            (evt) => {
                                const copy = {...game}
                                copy.matchDate = evt.target.value
                                updateGame(copy)
                            }
                        }
                        


                        type="date" id="date"
                        className="form-control"/>
                </div>

                
            </fieldset>
            
            <button className="btn btn-primary" onClick={submitGame}>
                Submit Game
            </button>
        </form>
        </>
    )
}
