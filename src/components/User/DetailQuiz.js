import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question";
const DetailQuiz = (props) => {
    //lấy tham số trên URL
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    // console.log(location)
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

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
                    //item là 1 bản ghi trong backend, chứa 1 câu hỏi và đáp án
                    value.forEach((item, index) =>{
                        if (index === 0){
                            questionDescription = item.description;
                            image = item.image;
                        }
                        //item.answers đại diện cho 1 đáp án
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                        // console.log("item answers ",item.answers)
                    });
                    // console.log('value - key', value, key);
                    return {questionId: key, answers : answers, questionDescription: questionDescription, image: image}
                }
                )
                .value()
                // console.log(data);
                setDataQuiz(data);
                console.log(dataQuiz);
        }       
    }
    
    const handlePrev = () =>{
        if (currentQuestion -1 < 0){
            return;
        }
        else{
            setCurrentQuestion(currentQuestion  - 1);
        }
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > currentQuestion + 1){
            setCurrentQuestion(currentQuestion+1);
        }
        
    }

    const handleCheckbox = (answerId, questionId) => {
        //sao chép dataQuiz
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => Number(item.questionId) === Number(questionId))
        if (question) {
            console.log('q: ',question);
            if (question && question.answers){
                let b = question.answerId.map(answer => {
                    if (Number(answer.id) === Number(answerId)){
                        answer.isSelected = true;
                    }
                    return answer;
                })
            }
        }
    }
    const handleFinish = () => {

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
                    <Question handleCheckbox = {handleCheckbox} currentQuestion = {currentQuestion} data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []}/>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning" onClick={() => handleFinish()}>Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}


export default DetailQuiz;