import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc';
import _ from 'lodash';
import { useTranslation, Trans } from 'react-i18next'

const ModalViewUser = (props) => {
    const { t } = useTranslation();
    const {show, setShow, listUsers, ID} = props;

    console.log(listUsers)
    console.log(ID)

    const handleClose =() => {
        setShow(false)
        setEmail ("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    };

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (show && ID && listUsers.length > 0) {
            const selectedUser = listUsers.find(user => user.id === ID);
            if (selectedUser) {
                setEmail(selectedUser.email || "");
                setPassword(selectedUser.password || "");
                setUsername(selectedUser.username || "");
                setRole(selectedUser.role || "USER");
                if (selectedUser.image) {
                    setPreviewImage(`data:image/jpeg;base64,${selectedUser.image}`);
                } else {
                    setPreviewImage("");
                }
            }
        }
    }, [show, ID, listUsers]);
    

  return (
    <>
        <Modal 
            show={show} 
            onHide={handleClose} 
            size='xl'
            backdrop="static"
            className='modal-add-user'
        >
            <Modal.Header closeButton>
                <Modal.Title>{t('view_user.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">{t('view_user.email')}</label>
                        <input type="email" className="form-control" value={email} disabled onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('view_user.password')}</label>
                        <input type="password" className="form-control" value={password} disabled onChange={(event) =>setPassword(event.target.value)}/>
                    </div>
                    
                    <div className="col-md-6">
                        <label className="form-label">{t('view_user.username')}</label>
                        <input type="text" className="form-control" value={username} disabled onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">{t('view_user.role')}</label>
                        <select className="form-select" value={role} disabled onChange={(event) => setRole(event.target.value)}>
                            <option value="USER">{t('view_user.user')}</option>
                            <option value="ADMIN">{t('view_user.admin')}</option>
                        </select>
                    </div>

                    <div className='col-md-12'>
                        <label className='form-label label-upload' htmlFor='labelUpload'> <FcPlus/>{t('view_user.upload')}</label>
                        <input type='file' id='labelUpload' hidden />
                    </div>

                    <div className='col-md-12 img-preview'>
                        {previewImage ? <img src={previewImage}/> : <span>{t('view_user.preview')}</span> }
                        
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('view_user.close')}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ModalViewUser;
