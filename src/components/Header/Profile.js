import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfor from './UserInfor'; 
import './Share.scss'
const Profile = (props) => {
    const {show, setShow} = props;
    const handleClose =() => {
        setShow(false)
    };
    const user = {
        email: "user@example.com",
        username: "johndoe",
        password: "secret123"
    };
    return (
        <div className='profile'>
            <Modal
                show = {show}
                onHide = {handleClose}
                size = "xl"
                backdrop = 'static'
                className = 'modal-profile'
                height = "300px"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="home" title="Main Infor">
                            <UserInfor user={user} />
                        </Tab>
                        <Tab eventKey="profile" title="Change password">
                            Change password
                        </Tab>
                        <Tab eventKey="history" title="History">
                            History do quiz
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile;