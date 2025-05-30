import _ from 'lodash'
import { useState } from 'react';
import Lightbox from 'react-awesome-lightbox';

const Question = (props) =>{
    const {data, currentQuestion, handleCheckbox} = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    
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
                    <img style={{cursor: 'pointer'}} onClick={() => setIsPreviewImage(true)} src={`data:image/jpeg;base64,${data.image}`} />
                    {isPreviewImage === true && 
                        <Lightbox 
                            image={`data:image/jpeg;base64,${data.image}`} 
                            onClose={() =>setIsPreviewImage(false)} 
                            title={"Question Image"}
                        >                 
                        </Lightbox>
                    }
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