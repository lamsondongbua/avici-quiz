import _ from 'lodash'

const Question = (props) =>{
    const {data, currentQuestion, handleCheckbox} = props;
    if (_.isEmpty(data)){
        return (
            <>
            </>
        )
    }

    const handleHandleCheckbox = (e,aId,qId) =>{
        console.log('check',e.target.checked)
        console.log('id', aId,qId);
        handleCheckbox(aId,qId);

    }

    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                </div>
                :
                <div className='q-image'></div>
            }
            <div className="question">Question {currentQuestion + 1}: {data.questionDescription}</div>
                <div className="answer">
                    {data.answers && data.answers.length && data.answers.map((a,index) =>{
                        return (
                            <div key={`answer-${index}`} className='a-child'>
                                <div className="form-check">
                                    <input checked={a.isSelected} className="form-check-input" type="checkbox" onChange={(e) =>handleHandleCheckbox(e, a.id,data.questionId)}/>
                                    <label className="form-check-label">
                                        {a.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default Question;