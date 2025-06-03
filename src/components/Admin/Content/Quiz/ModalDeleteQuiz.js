import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-toastify'
import { deleteQuizForAdmin } from '../../../../services/apiServices';
import { useTranslation, Trans } from 'react-i18next'

const ModalDeleteQuiz = (props) => {
    const { t } = useTranslation();
    const {show, setShow, dataDeleteQuiz, fetchListQuiz} = props;
    const handleClose = () => setShow(false);
    const handleSubmitDeleteQuiz = async() =>{
        let data = await deleteQuizForAdmin(dataDeleteQuiz.id);
        console.log('tạo thành công');
        if (data && data.EC === 0 ){
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUsers();
            // props.setCurrentPage(1);
            await fetchListQuiz();
        }
        if (data && data.EC !== 0){
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal
                show={show} 
                onHide={handleClose}
                backdrop= "static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('modalDeleteQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('modalDeleteQuiz.body')} (id = <b>{dataDeleteQuiz && dataDeleteQuiz.id ? dataDeleteQuiz.id : ""}</b>)</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modalDeleteQuiz.cancel')}
                    </Button>
                    <Button variant="primary" onClick={() => {handleSubmitDeleteQuiz()}}>
                        {t('modalDeleteQuiz.confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;