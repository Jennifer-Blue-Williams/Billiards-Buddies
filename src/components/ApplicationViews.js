import React from "react"
import { Route } from "react-router-dom";
// import { PlayersList } from "./players/PlayersList";
import { GamesList } from "./games/GamesList";
import { GameForm } from "./games/GameForm";

export const ApplicationViews = () => {
    return (
        <>
            {/* <Route exact path="/players">
                <PlayersList />
            </Route> */}

            <Route exact path="/games">
                <GamesList />
            </Route>

            <Route path="/games/create">
                <GameForm />
            </Route>
        </>
    )
}