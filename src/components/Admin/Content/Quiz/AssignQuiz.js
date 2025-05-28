import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz} from "../../../../services/apiServices";
import './Button_Animatic.scss'
import {toast} from 'react-toastify'
const AssignQuiz = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    const [selectedUser, setSelectedUser] = useState({});
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    },[]);
    
    const fetchQuiz = async() => {
        let response = await getAllQuizForAdmin();
        //check response sau khi get
        console.log('response is got by API: ', response);
        if (response && response.EC === 0){
            let newQuiz = response.DT.map(item =>{
                return {
                    value: item.id,
                    label: `${item.id}. ${item.name}`
                }
            })
            
            setListQuiz(newQuiz);
        }
    
    }

    const fetchUser = async() => {
        let response = await getAllUsers();
        //check response sau khi get
        console.log('response is got by API: ', response);
        if (response && response.EC === 0){
            let Users = response.DT.map(item =>{
                return {
                    value: item.id,
                    label: `${item.id}. ${item.username} - ${item.email}`
                }
            })
            
            setListUser(Users);
        }
    
    }

    const handleAssign  = async() => {
        let response = await postAssignQuiz(selectedQuiz.value,selectedUser.value)
        //check xem có lấy được id quiz và id user để gán thành 1 cặp đc ko
        // console.log('check response assign quiz and user: ',response);
        if (response && response.EC === 0){
            toast.success(response.EM);
        }
        else{
            toast.error(response.EM)
        }
    }
    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz: </label>
                <Select
                    className='z-indexx'
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}                        
                />
            </div>

            <div className='col-6 form-group'>
                <label className='mb-2'>Select User: </label>
                <Select
                    className='z-indexx'
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}                        
                />
            </div>

            <div>
                <button onClick={() => handleAssign()} className="btn-assign btn-animatic mt-2">Assign</button>
            </div>
        </div>

    )
}
export default AssignQuiz;