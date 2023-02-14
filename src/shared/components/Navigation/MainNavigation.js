import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";

import NavLinks from "./Navlinks";
import  SideDrawer from './SideDrawer'

import './MainNavigation.scss' 
import Backdrop from "../../UIElements/Backdrop";


export default function MainNavigation(){
    const [drawerIsOpen, setDrawerIsOpen] = React.useState(false)

    function openDrawerHandler(){
        setDrawerIsOpen(true)
    }

    function closeDrawerHandler(){
        setDrawerIsOpen(false)
    }
    return(
        <React.Fragment>

            {drawerIsOpen && <Backdrop  onClick={closeDrawerHandler} />}

            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}> 
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>

            <MainHeader> 
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Your places</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}