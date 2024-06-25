"use client"
import './SideNavbar.css';
import Hamburger from './Hamburger';
import Content from '../Content'
import { useState } from 'react';
import Link from 'next/link';

export default function SideNavbar() {
    var [open, setOpen] = useState(false)
    const links = [{route: "/", title: "\"homesweethome\""}, {route: "/birthday-wish", title: "birthday wish"}, 
                    {route: "/lp-player", title: "lp player"}, {route: "/photo-card", title: "photo card"},
                    {route: "/dear-yerin/letters", title: "dear.yerin"}]
    const handleClose = () => {setOpen(false)}

    return (
        <>
            <div className="ham-logo-container">
                <Hamburger open = {open} handleOpen = {setOpen}/>
                <Link href={"/"} style={{height: "100%"}} onClick = {handleClose}>
                    <img src="/logo.png" className="logo"/>
                </Link>
            </div>
            <div className="sidenavbar-container" id={open ? 'side-panel-show' : ''}>
                <div className="side-panel-back" id={open ? 'side-panel-show' : ''}>
                    <div className="sidecontent-container">
                        <Content links={links} handleClose={handleClose}/>
                    </div>
                </div>
            </div>
        </>
    )
}