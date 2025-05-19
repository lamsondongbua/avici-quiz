import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
const DetailQuiz = (props) => {
    //lấy tham số trên URL
    const params = useParams();
    const quizId = params.id;

    useEffect(() =>{
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async() => {
        let response = await getDataQuiz(quizId);
        console.log('chẹc qué', response)
    }
    
    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}

export default DetailQuiz;