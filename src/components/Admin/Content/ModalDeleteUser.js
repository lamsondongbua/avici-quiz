import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiServices';
import {toast} from 'react-toastify'
import { useTranslation, Trans } from 'react-i18next'

const ModalDeleteUser = (props) => {
    const { t } = useTranslation();
    const {show, setShow, dataDelete} = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async() =>{
        let data = await deleteUser(dataDelete.id);
        console.log('tạo thành công');
        if (data && data.EC === 0 ){
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUsers();
            props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(1);
        }
        if (data && data.EC !== 0){
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal
                className='modal-delete-user' 
                show={show} 
                onHide={handleClose}
                backdrop= "static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('modalDeleteUser.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('modalDeleteUser.body')} (email = <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>)</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modalDeleteUser.cancel')}
                    </Button>
                    <Button variant="primary" onClick={() => {handleSubmitDeleteUser()}}>
                        {t('modalDeleteUser.confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;