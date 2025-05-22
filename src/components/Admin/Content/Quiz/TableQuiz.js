import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import './ManageQuiz.scss'
const TableQuiz = (props) => {
    const {reloadList} = props;
    
    const [listQuiz, setListQuiz] = useState([]);
    const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false);
    const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false);
    const [dataUpdateQuiz, setUpdateDataQuiz] = useState({});
    const [dataDeleteQuiz, setDeleteDataQuiz] = useState({});

    
    useEffect(() => {
        fetchQuiz();
    },[reloadList]);
    
    const fetchQuiz = async() => {
        setUpdateDataQuiz({});
        setDeleteDataQuiz({});
        let response = await getAllQuizForAdmin();
        //check response sau khi get
        console.log('response is got by API: ', response);
        if (response && response.EC === 0){
            setListQuiz(response.DT)
        }
    
    }

    const handleUpdate = (quiz) =>{
        // console.log('data update:', dataUpdateQuiz);
        setUpdateDataQuiz(quiz);
        setIsShowModalUpdateQuiz(true);
    }
    
    const handleDelete = (quiz) => {
        // console.log('data delete',dataDeleteQuiz)
        setDeleteDataQuiz(quiz);
        setIsShowModalDeleteQuiz(true);
    }
    return (
        <>
        <div className="mt-2"><b>List Quizzes</b></div>
        <div>
            <table className="table table-striped table-info table-hover my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{display: 'flex', gap: '15px'}}>
                                    <button className="btn " style={{backgroundColor: '#07f22e'}} onClick={() => handleUpdate(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    
                    
                </tbody>
            </table>
            <ModalUpdateQuiz
                show = {isShowModalUpdateQuiz}
                setShow = {setIsShowModalUpdateQuiz}
                dataUpdateQuiz = {dataUpdateQuiz}
                fetchListQuiz = {fetchQuiz}
                setUpdateDataQuiz = {setUpdateDataQuiz}
            />
            <ModalDeleteQuiz
                show = {isShowModalDeleteQuiz}
                setShow = {setIsShowModalDeleteQuiz}
                dataDeleteQuiz = {dataDeleteQuiz}
                fetchListQuiz = {fetchQuiz}
            />
        </div>
        </>
    )
}

export default TableQuiz;