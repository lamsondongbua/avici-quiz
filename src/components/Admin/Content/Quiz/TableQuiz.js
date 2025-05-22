import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
const TableQuiz = (props) => {
    
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    },[])
    
    const fetchQuiz = async() => {
        let response = await getAllQuizForAdmin();
        //check response sau khi get
        console.log('response is got by API: ', response);
        if (response && response.EC === 0){
            setListQuiz(response.DT)
        }
    
    }

    return (
        <>
        <div className="mt-2"><b>List Quizzes</b></div>
        <div>
            <table className="table table-striped table-info table-hover mt-5">
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
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    
                    
                </tbody>
            </table>
        </div>
        </>
    )
}

export default TableQuiz;