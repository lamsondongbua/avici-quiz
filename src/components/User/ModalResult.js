import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation, Trans } from 'react-i18next'

const ModalResult = (props) => {
    const { t } = useTranslation();

    const {show, setShow, dataModalResult} = props;

    const handleClose = () => setShow(false);
    //check data cho modal result
    console.log(dataModalResult);

    return (
        <>
            <Modal
                className='modal-delete-user' 
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
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modalResult.showAnswers')}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {t('modalResult.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;