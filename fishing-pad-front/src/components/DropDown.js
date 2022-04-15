import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const DropDown = () => {

    function LogoutUser(e) {

        e.preventDefault();
        window.sessionStorage.clear();
        window.location.href = '/';

    }

    return (
        <div>
            <DropdownButton
                drop="start"
                variant="secondary"
                title={window.sessionStorage.getItem("prenom")}
            >
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={LogoutUser}>Déconnexion</Dropdown.Item>
            </DropdownButton>
        </div>
    );
};

export default DropDown;