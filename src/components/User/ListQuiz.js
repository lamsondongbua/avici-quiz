import { useEffect, useState } from "react";
import { getQuizByUser } from '../../services/apiServices';
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";
const ListQuiz = (props) => {
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
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button onClick={()=> navigate(`/quiz/${quiz.id}`)} className="btn btn-primary">Start Now</button>
                            </div>
                        </div>
                    );
                })
            }

            {arrayQuiz && arrayQuiz.length === 0 &&
                <div>You don't have any quiz now...</div>
            }
        </div>
    );
};

export default ListQuiz;
