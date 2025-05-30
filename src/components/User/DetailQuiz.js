import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question";
import ModalResult from './ModalResult'
import RightContent from "./Time_NumberQuestion/RightContent";
const DetailQuiz = (props) => {
    //lấy tham số trên URL
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    // console.log(location)
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);


    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({})

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
        //tạo bản sao dataQuiz tránh thay đổi trực tiếp state
        let dataQuizClone = _.cloneDeep(dataQuiz);
        //tìm câu hỏi tương ứng trong mảng bản sao
        let question = dataQuizClone.find(item => Number(item.questionId) === Number(questionId))
        if (question) {
            console.log('q: ',question);
            if (question && question.answers){
                //lặp qua các đáp án, đáp án nào mà được chọn thì cập nhật isSelected là được nhấn
                question.answers = question.answers.map(answer => {
                    if (Number(answer.id) === Number(answerId)){
                        answer.isSelected = !answer.isSelected;
                    }
                    return answer;
                })
                // console.log(question.answers)
            }
            //Cập nhật các phần tử trong mảng 
            let index = dataQuizClone.findIndex (item => Number(item.questionId) === Number(questionId))
            if (index > -1){
                dataQuizClone[index] = question;
                //cập nhật lại state để render lại ra giao diện
                setDataQuiz(dataQuizClone);
            }
        }   
    }
    const handleFinish = async() => {
        console.log('đây là data trước khi submit', dataQuiz);
        //đây là form data cần build để gửi về server
        let payload = {
            quizId: Number(quizId),
            answers: []
        }

        let answers = [];
        if (dataQuiz && dataQuiz.length > 0){
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId  = [];

                //lấy các isSelected = true cho vàoo form
                question.answers.forEach(a => {
                    if(a.isSelected === true){
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: Number(questionId),
                    userAnswerId: userAnswerId
                })

            })
            //cập nhật answers
            payload.answers = answers;
            //kiểm tra lại form 
            console.log("final payload: ", payload);
            
            //đẩy lên API
            let response = await postSubmitQuiz(payload);
            console.log('check response: ',response); 
            if (response && response.EC === 0){
                setDataModalResult({
                   countCorrect: response.DT.countCorrect,
                   countTotal: response.DT.countTotal,
                   quizData: response.DT.quizData
                })
                setIsShowModalResult(true);
            }
            else{
                alert('Something wrong');
            }    
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
                    <Question handleCheckbox = {handleCheckbox} currentQuestion = {currentQuestion} data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []}/>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning" onClick={() => handleFinish()}>Finish</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent 
                    dataQuiz = {dataQuiz}
                    handleFinish = {handleFinish}
                />
            </div>
            <ModalResult
                show = {isShowModalResult}
                setShow = {setIsShowModalResult}
                dataModalResult = {dataModalResult}

            />
        </div>
    )
}


export default DetailQuiz;