import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfor from './UserInfor';
import ChangePassword from './ChangePassword';
import History from './History';
import './Share.scss';
import { useTranslation } from 'react-i18next';

const Profile = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            backdrop="static"
            className="modal-profile"
        >
            <Modal.Header closeButton>
                <Modal.Title>{t('profile.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs id="justify-tab-example" className="mb-3" justify>
                    <Tab eventKey="home" title={t('profile.tab.main')}>
                        <UserInfor />
                    </Tab>
                    <Tab eventKey="profile" title={t('profile.tab.changePassword')}>
                        <ChangePassword />
                    </Tab>
                    <Tab eventKey="history" title={t('profile.tab.history')}>
                        <History />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
};

export default Profile;
