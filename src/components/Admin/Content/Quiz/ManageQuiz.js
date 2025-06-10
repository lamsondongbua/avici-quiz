import { useState, useRef } from 'react'
import './ManageQuiz.scss'
import {toast} from 'react-toastify';
import Select from 'react-select'
import { postCreateNewQuiz } from '../../../../services/apiServices'
import TableQuiz from './TableQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { useTranslation, Trans } from 'react-i18next'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const options = [
    {value: 'EASY', label: 'EASY'},
    {value: 'MEDIUM', label: 'MEDIUM'},
    {value: 'HARD', label: 'HARD'}
]

const ManageQuiz = (props) => {
    const { t } = useTranslation();
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
            toast.error(t('managequiz.toast.missingFields'));
            return;
        }
        
        let response = await postCreateNewQuiz(description, namequiz, type?.value, image)
        //check response sau khi post
        // console.log('response after post: ', response)
        if (response && response.EC === 0){
            toast.success(response.EM);
            setReloadList(prev => !prev);
        }
        else{
            toast.error(response.EM);
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
            <Tabs
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab title={t('managequiz.header')} eventKey = 'ManageQuiz'>
                    <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">{t('managequiz.addNewQuiz')}</legend>
                            <div className="form-floating mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder={t('managequiz.placeholder.quizName')}
                                    value={namequiz}
                                    onChange={(e) => setNameQuiz(e.target.value)}
                                />
                                <label>{t('managequiz.nameQuiz')}</label>
                            </div>
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder={t('managequiz.placeholder.description')}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <label>{t('managequiz.description')}</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue = {type}
                                    onChange = {setType}
                                    options = {options}
                                    placeholder={t('managequiz.placeholder.quizType')}
                                />
                            </div>
                            <div className='more-actions form-group'>
                                <label className='mb-1'>{t('managequiz.uploadImage')}</label>
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
                                    {t('managequiz.save')}
                                </button>
                            </div>
                        </fieldset>
                    </div>
                    <div className="list-detail">
                        <TableQuiz reloadList={reloadList}/>
                    </div>
                </Tab>
                <Tab eventKey='Updata Quiz Q/A' title={t('managequiz.updateQA')}>
                    <QuizQA/>
                </Tab>
                <Tab eventKey='Assign Quiz' title={t('managequiz.assignToUsers')}>
                    <AssignQuiz/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ManageQuiz;