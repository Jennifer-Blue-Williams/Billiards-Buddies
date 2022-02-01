import React from "react"
import { Route } from "react-router-dom";
// import { PlayersList } from "./players/PlayersList";
import { GamesList } from "./games/GamesList";

export const ApplicationViews = () => {
    return (
        <>
            {/* <Route exact path="/players">
                <PlayersList />
            </Route> */}

            <Route path="/games">
                <GamesList />
            </Route>

            {/* <Route path="/games/create">
                <GameForm />
            </Route> */}
        </>
    )
}