import './Header.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [selected, setSelected] = useState(true);
    const navigate = useNavigate();
    const goToFindImages = () => {navigate('/create')};
    const goToGallery = () => {navigate('/view')};

    return(
        <div className="header">
            <div
            className={`header-selectable ${selected ? "on" : "off" }`}
            onClick={() => {
                setSelected(true);
                goToFindImages();
                }}>
                <p>Find Images</p>
            </div>
            <div
            className={`header-selectable ${!selected ? "on" : "off" }`}
            onClick={() => {
                setSelected(false)
                goToGallery();
                }}>
                <p>Your Gallery</p>
            </div>
        </div>)
}

export default Header;