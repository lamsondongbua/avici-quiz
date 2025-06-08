import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './DetailQuiz.scss';
import PerfectScrollbar from 'react-perfect-scrollbar'


const ShowAnswer = (props) => {
    const { showAnswer, setShowAnswer, dataModalAnswer } = props;

    const handleClose = () => {
        setShowAnswer(false);
    }

    console.log('data bên show answer',dataModalAnswer);
    return (
        <div className='scroll-container modal-show-answer'>
            <PerfectScrollbar>
                <Modal 
                    show={showAnswer} 
                    onHide={handleClose}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Correct Answers:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Kiểm tra xem dataModalAnswer có dữ liệu không */}
                        {dataModalAnswer && dataModalAnswer.quizData && dataModalAnswer.quizData.length > 0 ? (
                            <div className='answer-list'>
                                <ul>
                                    {dataModalAnswer.quizData.map((question, index) => (
                                        <li key={index}>
                                            <p>Câu hỏi số {index + 1}: {question.systemAnswers[0]?.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>Không có câu hỏi nào.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </PerfectScrollbar>
        </div>
    );
}

export default ShowAnswer;
