import { useState } from 'react';
import Select from 'react-select'
import './Questions.scss'
import {BsFillPatchPlusFill,BsPatchMinusFill} from 'react-icons/bs';
import {AiFillPlusSquare, AiOutlineMinusCircle} from 'react-icons/ai';
import {RiImageAddFill} from 'react-icons/ri';
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});
    
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answersCreated: [
                    {id: uuidv4(), description: '', isCorrect: false},
                ]
            }
        ]
    )
    //check form question
    // console.log('question dạng: ', questions);

    const handleAddRemoveQuestion = (type,id) => {
        //check type và id xem có hiện ko?
        // console.log('loại nút và id: ', type, id);
        if (type === 'ADD'){
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answersCreated: [
                    {id: uuidv4(), description: '', isCorrect: false},
                ]
            }
            
            setQuestions([...questions,newQuestion]);
        }
        if (type === 'REMOVE'){
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }

    const handleAddRemoveAnswer = (type,questionId, answerId) => {
        //check type và id xem có hiện ko?
        // console.log('loại nút và id: ', type, questionId, answerId);
        let questionClone = _.cloneDeep(questions);
        if (type === 'ADD'){
            const newAnswer = {id: uuidv4(), description: '', isCorrect: false};
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answersCreated.push(newAnswer);
            setQuestions(questionClone);
        }
        if (type === 'REMOVE'){
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answersCreated = questionClone[index].answersCreated.filter(item => item.id !== answerId);
            setQuestions(questionClone);
        }
    }
    //lấy value câu hỏi từ người dùng nhập
    const handleOnChangeForQuestion = (type, questionId, value) => {
        if (type === 'QUESTION'){
            let questionClone = _.cloneDeep(questions);
            let index = questionClone.findIndex(item => item.id === questionId);
            if (index > -1){
                questionClone[index].description = value;
                setQuestions(questionClone);
            }
        }
    }
    //lấy value ảnh từ người dùng upload
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]){
            questionClone[index].imageFile = event.target.files[0];
            // console.log(event.target.files[0]);
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone);
        }
    }

    const handleCheckBox = (type,answerId,questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionClone[index].answersCreated = questionClone[index].answersCreated.map(answer => {
                if (answer.id === answerId){
                    if (type === 'CHECKBOX'){
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT'){
                        answer.description = value;
                    }
                }
                return answer;
            })
            setQuestions(questionClone);
        }
    }
    
    const handleSubmitQuestionForQuiz = () => {
        
    }
    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <hr/>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add questions: 
                </div>
                {
                    questions && questions.length > 0 && 
                    questions.map((question,index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className="form-floating description ">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder='Create Your Description'
                                            value={question.description}
                                            onChange={(e) => handleOnChangeForQuestion('QUESTION', question.id,e.target.value)}
                                        />
                                        <label>Create Description For Your Question {index + 1}</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up'/>
                                        </label>
                                        <input id={`${question.id}`} type='file' onChange={(e) => handleOnChangeFileQuestion(question.id, e)} hidden/>
                                        <span>{question.imageName ? question.imageName : 'No file is uploaded'}</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsFillPatchPlusFill className='icon-add'/>
                                        </span>
                                        {   questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsPatchMinusFill className='icon-remove'/>
                                            </span>
                                        }
                                    </div>

                                </div>

                                {   question.answersCreated && question.answersCreated.length > 0 && 
                                    question.answersCreated.map((answer,index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    className='form-check-input iscorrect'
                                                    type='checkbox'
                                                    checked = {answer.isCorrect}
                                                    onChange={(event) => handleCheckBox('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name ">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder='Create Your Description'
                                                        value={answer.description}
                                                        onChange={(e) => handleCheckBox('INPUT',answer.id,question.id,e.target.value)}
                                                    />
                                                    <label>Answer {index+1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiFillPlusSquare className='icon-add'/>
                                                    </span>
                                                    {   question.answersCreated.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusCircle className='icon-remove'/>
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 && 
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()} 
                            className='btn btn-dark'
                        >
                            Save Questions
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}

export default Questions;