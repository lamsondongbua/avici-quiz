import { useState, useRef } from 'react'
import './ManageQuiz.scss'
import {toast} from 'react-toastify';
import Select from 'react-select'
import { postCreateNewQuiz } from '../../../../services/apiServices'
import TableQuiz from './TableQuiz';
import { Accordion } from 'react-bootstrap';


const options = [
    {value: 'EASY', label: 'EASY'},
    {value: 'MEDIUM', label: 'MEDIUM'},
    {value: 'HARD', label: 'HARD'}
]

const ManageQuiz = (props) => {
    const [reloadList, setReloadList] = useState(false);
    const [namequiz, setNameQuiz] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleChangeFile = (event) =>{
        if (event.target && event.target.files && event.target.files[0]){
            setImage(event.target.files[0])   
        }
    } 

    const handleSubmitQuiz = async() => {
        //validate
        if (!namequiz || !description){
            toast.error("Name/Description is required. Do you want create it?")
            return;
        }
        
        let response = await postCreateNewQuiz(description, namequiz, type?.value, image)
        //check response sau khi post
        // console.log('response after post: ', response)
        if (response && response.EC === 0){
            toast.success(response.EM)
            setReloadList(prev => !prev);
        }
        else{
            toast.error(response.EM)
        }
        //reset lại form khi post response xong
        setNameQuiz('');
        setDescription('');
        setType('EASY');
        setImage(null);
        if (fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

    

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey= '0'>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header><b>Manage Quizzes</b></Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add New Quiz</legend>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder='Your Quiz Name...'
                                        value={namequiz}
                                        onChange={(e) => setNameQuiz(e.target.value)}
                                    />
                                    <label>Name Quiz</label>
                                </div>
                                <div className="form-floating">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder='Create Your Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label>Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                            defaultValue = {type}
                                            onChange = {setType}
                                            options = {options}
                                            placeholder = {'Quiz type...'}
                                        />
                                </div>
                                <div className='more-actions form-group'>
                                    <label className='mb-1'>Upload Image</label>
                                    <input 
                                        type='file' 
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                        ref = {fileInputRef}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button 
                                        className='btn btn-warning'
                                        onClick={() => handleSubmitQuiz()}
                                    >
                                        Save
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz reloadList={reloadList}/>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey='1'>
                    <Accordion.Header><b>Update Q/A Quizzes</b></Accordion.Header>
                    <Accordion.Body>
                        
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='2'>
                    <Accordion.Header><b>Assign to Users</b></Accordion.Header>
                    <Accordion.Body>
                        
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ManageQuiz;