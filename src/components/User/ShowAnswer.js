import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './DetailQuiz.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';

const ShowAnswer = (props) => {
    const { showAnswer, setShowAnswer, dataModalAnswer } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShowAnswer(false);
    };

    return (
        <div className='scroll-container modal-show-answer'>
            <PerfectScrollbar>
                <Modal 
                    show={showAnswer} 
                    onHide={handleClose}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{t('showAnswer.title')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {dataModalAnswer && dataModalAnswer.quizData && dataModalAnswer.quizData.length > 0 ? (
                            <div className='answer-list'>
                                <ul>
                                    {dataModalAnswer.quizData.map((question, index) => (
                                        <li key={index}>
                                            <p>
                                                {t('showAnswer.questionNumber', { number: index + 1 })}: {question.systemAnswers[0]?.description}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>{t('showAnswer.noQuestion')}</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            {t('showAnswer.close')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </PerfectScrollbar>
        </div>
    );
};

export default ShowAnswer;
