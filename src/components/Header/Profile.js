import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfor from './UserInfor'; 
import ChangePassword from './ChangePassword';
import './Share.scss'
import History from './History';
import { useEffect } from 'react';
const Profile = (props) => {
    const {show, setShow} = props;
    const handleClose =() => {
        setShow(false)
    };

    return (
        <>
            <Modal
                show = {show}
                onHide = {handleClose}
                size = "xl"
                backdrop = 'static'
                className = 'modal-profile'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="home" title="Main Infor">
                            <UserInfor/>
                        </Tab>
                        <Tab eventKey="profile" title="Change password">
                            <ChangePassword/>
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <History/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Profile;