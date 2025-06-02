import CountDown from "./CountDown";
import {useRef} from 'react';
import { useTranslation, Trans } from 'react-i18next'

const RightContent = (props) => {
    const refDiv = useRef([]);

    const {dataQuiz, handleFinish, setIndex} = props;

    const onTimeUp = () => {
        handleFinish();
    }

    const getClassQuestion = (question) => {
        //check answer select
        if (question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered){
                return "question selected";
            }
        }
        return "question"
    }

    const handleClickQuestion = (question, index) => {
        setIndex(index);
        if (refDiv.current){
            refDiv.current.forEach(item => {
                if (item && item.className === 'question clicked'){
                    item.className = 'question'
                }
            })
        }
        if (question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered){
                return;
            }
        }
        refDiv.current[index].className = "question clicked";
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp = {onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return(
                            <div key={`question-abc-${index}`} ref={element => refDiv.current[index] = element} className={getClassQuestion(item)} onClick={() => handleClickQuestion(item,index)}>{index + 1}</div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent;