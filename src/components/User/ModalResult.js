import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation, Trans } from 'react-i18next'
import { useNavigate } from "react-router-dom";


const ModalResult = (props) => {
    const { t } = useTranslation();

    const {show, setShow, dataModalResult} = props;

    const navigate = useNavigate();
    const handleClose = () =>{
        setShow(false);
        navigate('/users');
           
    }
    const handleShowAnswer  = () => {
        alert('Đang làm dở nha - Vô ModalResult nhé');
    }
    //check data cho modal result
    console.log(dataModalResult);

    return (
        <>
            <Modal
                className='modal-result' 
                show={show} 
                onHide={handleClose}
                backdrop= "static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('modalResult.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {t('modalResult.totalQuestions')} <b>{dataModalResult.countTotal}</b>
                    </div>
                    <div>
                        {t('modalResult.correctAnswers')} <b>{dataModalResult.countCorrect} </b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleShowAnswer()}>
                        {t('modalResult.showAnswers')}
                    </Button>
                    <Button variant="primary" onClick={()  => handleClose()}>
                        {t('modalResult.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;