import './Share.scss'
import './History.scss'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useEffect, useState } from 'react'
import { getListHistory } from '../../services/apiServices'
import moment from 'moment';
import 'moment-timezone';

const History = () => {
    const [listHistory, setListHistory] = useState([]);
    useEffect(() => {
        fetchHistory();
    },[]);

    const fetchHistory = async() => {
        let response = await getListHistory();
        if (response && response.EC === 0){
            let newData = response?.DT?.data?.map(item => {
                return {
                    total_correct : item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "",
                    id: item.id,
                    // utc: đổi thời gian sang dạng UTC toàn cầu, forrmat : định dạng thời gian theo chuỗi sẽ hiển thị A: AM
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            setListHistory(newData);
        }
        console.log('check response', response);
    }
    return (
        <div className='scroll-container history-container'>
            <PerfectScrollbar>
                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope='col'> Quiz Name</th>
                            <th scope="col">Total Questions</th>
                            <th scope="col">Total Correct</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listHistory && listHistory.length > 0 &&
                            listHistory.map((item,index) => {
                                return (
                                    <tr key={`table-users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.total_questions}</td>
                                        <td>{item.total_correct}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                )
                            })
                        }
                        {listHistory && listHistory.length === 0 &&
                            <tr>
                                <td colSpan={'4'}>Not found data</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </PerfectScrollbar>
        </div>
    )
}

export default History;