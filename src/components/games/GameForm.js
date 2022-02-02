import React from "react"
import { useHistory } from "react-router-dom"

export const GameForm = () => {
    const history = useHistory()
    const saveGame = (event) => {
        event.preventDefault()
    }

<div>
    <button onClick={() => history.push("/game/create")}>Record Game</button>
</div> 

    return (
        <>
        <form className="gameForm">
            <h2 className="gameForm__title">Record Your Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="opponentName">Opponent Name:</label>
                    <input
                        required autoFocus
                        type="text" id="opponentName"
                        className="form-control"
                        placeholder="Who did you play?"/>
                </div>

                <div>
                <select name="venue" id="venue">
                   <option value="option 1">JOB's Billiards</option>
                   <option value="option 2">Cobra</option>
                   <option value="option 2">H-Cues Upsatirs Pool Room</option>
                   <option value="option 2">Mickey's Tavern</option>
                </select>
                </div>

                <div>
                <select name="win" id="win">
                   <option value="option 1">WON</option>
                   <option value="option 2">LOST</option>
                </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        required autoFocus
                        type="date" id="date"
                        className="form-control"
                        placeholder="Who did you play?"/>
                </div>

                
            </fieldset>
            
            <button className="btn btn-primary" onClick={saveGame}>
                Submit Game
            </button>
        </form>
        </>
    )
}
