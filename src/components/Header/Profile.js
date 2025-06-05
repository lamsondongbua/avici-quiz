import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
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
                        defaultActiveKey="profile"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="home" title="Main Infor">
                            Your information
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
        </>
    )
}

export default Profile;