import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";

import './MainNavigation.scss' 

export default function MainNavigation(){
    return(
        <MainHeader> 
            <button className="main-navigation__menu-btn">
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">Your places</Link>
            </h1>
            <nav>...</nav>
        </MainHeader>
    )
}