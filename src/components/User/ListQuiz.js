import { useEffect, useState } from "react";
import { getQuizByUser } from '../../services/apiServices';
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next'

const ListQuiz = (props) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [arrayQuiz, setArrayQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        const response = await getQuizByUser();
        console.log('response', response);
        if (response && response.EC === 0) {
            setArrayQuiz(response.DT);
        }
    };

    return (
        <div className="list-quiz-container container">
            {arrayQuiz && arrayQuiz.length > 0 &&
                arrayQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: '18rem' }}>
                            <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="quiz thumbnail" />
                            <div className="card-body">
                                <h5 className="card-title">{t('listQuiz.title')} {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button onClick={()=> navigate(`/quiz/${quiz.id}`, {state: { quizTitle: quiz.description }})} className="btn btn-primary">{t('listQuiz.start')}</button>
                            </div>
                        </div>
                    );
                })
            }

            {arrayQuiz && arrayQuiz.length === 0 &&
                <div>{t('listQuiz.noQuiz')}</div>
            }
        </div>
    );
};

export default ListQuiz;
