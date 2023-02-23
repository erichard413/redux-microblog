import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, NavItem, Nav} from 'reactstrap';
import './css/Header.css';

const Header = () => {
    let activeStyle= {
        textDecoration: "none",
        color: `rgb(245, 5, 245)`
    }
    return (
        <div className="Header">
            <div className="Header-left">
                <h1>MicroBlog</h1>
                <span id="tagline">An ugly blog website for beautiful people &#8482;</span>
            </div>
            <div className="Header-right">
                <Navbar>
                    <Nav>
                        <NavItem><NavLink to="/home" style={({isActive}) => isActive ? activeStyle: undefined}>Home</NavLink></NavItem>
                        <NavItem><NavLink to="/new" style={({isActive}) => isActive ? activeStyle: undefined}>New Post</NavLink></NavItem>
                        {/* <NavItem><NavLink to="/blog" style={({isActive}) => isActive ? activeStyle: undefined}>Blog</NavLink></NavItem> */}
                    </Nav>
                </Navbar>
            </div>   
        </div>
    )
}

export default Header;