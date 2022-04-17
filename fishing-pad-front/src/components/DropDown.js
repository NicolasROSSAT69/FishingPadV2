import { Dropdown, DropdownButton } from 'react-bootstrap';
import ModalProfile from './ModalProfile';

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
                <ModalProfile />

                <Dropdown.Divider />
                <Dropdown.Item onClick={LogoutUser}>Déconnexion</Dropdown.Item>
            </DropdownButton>

        </div>
    );
};

export default DropDown;