import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from 'lodash'
import './DetailQuiz.scss'
const DetailQuiz = (props) => {
    //lấy tham số trên URL
    const params = useParams();
    const quizId = params.id;

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

                </div>
                <div className="q-body">
                    <img/>
                </div>
                <div className="q-content">
                    question content
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz;