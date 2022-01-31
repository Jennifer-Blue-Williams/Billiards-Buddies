import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/players">Players</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/games">My Games</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/games/create">Record Game</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        ()=> {
                            localStorage.removeItem("billiards_player")
                        }
                    }>
                    Logout
                </Link>
            </li>
        </ul>
    )
}