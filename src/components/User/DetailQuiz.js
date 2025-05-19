import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from 'lodash'
import './DetailQuiz.scss'
const DetailQuiz = (props) => {
    //lấy tham số trên URL
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    console.log(location)

    useEffect(() =>{
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async() => {
        let response = await getDataQuiz(quizId);
        // console.log('chẹc qué', response)
        if (response && response.EC === 0){
            //xử lí một câu hỏi có 3 đáp án nhưng bị lặp lại id của câu hỏi trong từng đáp án
            let raw = response.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value,key) =>{
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) =>{
                        if (index === 0){
                            questionDescription = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers);
                        // console.log("item answers ",item.answers)
                    });
                    // console.log('value - key', value, key);
                    return {questionId: key, answers : answers, questionDescription: questionDescription, image: image}
                }
                )
                .value()
            // console.log(data);
        }       
    }
    
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr/>
                <div className="q-body">
                    <img/>
                </div>
                <div className="q-content">
                    <div className="question">Question 1: how are you doing?</div>
                    <div className="answer">
                        <div className="a-child">A. fpofpssa</div>
                        <div className="a-child">B. fdsfs</div>
                        <div className="a-child">C. sdsf</div>
                    </div>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary">Prev</button>
                    <button className="btn btn-primary mr-3">Next</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz;