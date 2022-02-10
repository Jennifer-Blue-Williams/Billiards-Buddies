import React from "react"
import { Route } from "react-router-dom";
import { GamesList } from "./games/GamesList";
import { GameForm } from "./games/GameForm";
import { PlayersList } from "./players/PlayersList";
import { GamesShow } from "./games/GamesShow";

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/players">
                <PlayersList />
            </Route>

            <Route exact path="/mygames">
                <GamesList />
            </Route>

            <Route exact path="/games/:id">
                <GamesShow />
            </Route>

            <Route path="/games/create">
                <GameForm />
            </Route>
        </>
    )
}