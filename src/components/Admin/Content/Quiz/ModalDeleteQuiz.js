import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-toastify'
import { deleteQuizForAdmin } from '../../../../services/apiServices';
const ModalDeleteQuiz = (props) => {
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
                    <Modal.Title>Confirm Delete This Quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete the quiz which you selected (id = <b>{dataDeleteQuiz && dataDeleteQuiz.id ? dataDeleteQuiz.id : ""}</b>)</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {handleSubmitDeleteQuiz()}}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;