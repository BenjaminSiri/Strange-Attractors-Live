import './Header.css';

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    &:focus, &hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    color: white;
`;

function Header() {
    const [selected, setSelected] = useState(true);

    return(
        <div className="header">
            <StyledNavLink to="/create">
                <div
                className={`header-selectable ${selected ? "on" : "off" }`}
                onClick={() => {setSelected(true);}}>
                    <p>Find Images</p>
                </div>
            </StyledNavLink>
            <StyledNavLink to="/view">
                <div
                className={`header-selectable ${!selected ? "on" : "off" }`}
                onClick={() => {setSelected(false)}}>
                    <p>Your Gallery</p>
                </div>
            </StyledNavLink>
        </div>
    );
}

export default Header;