import './Share.scss'
import './History.scss'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useEffect, useState } from 'react'
import { getListHistory } from '../../services/apiServices'
import moment from 'moment'
import 'moment-timezone'
import { useTranslation } from 'react-i18next'

const History = () => {
    const { t } = useTranslation();
    const [listHistory, setListHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        let response = await getListHistory();
        if (response && response.EC === 0) {
            let newData = response?.DT?.data?.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "",
                    id: item.id,
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            });
            setListHistory(newData);
        }
    }

    return (
        <div className='scroll-container history-container'>
            <PerfectScrollbar>
                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">{t('history.id')}</th>
                            <th scope="col">{t('history.quizName')}</th>
                            <th scope="col">{t('history.totalQuestions')}</th>
                            <th scope="col">{t('history.totalCorrect')}</th>
                            <th scope="col">{t('history.date')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listHistory && listHistory.length > 0 ? (
                            listHistory.map((item, index) => (
                                <tr key={`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={'5'}>{t('history.noData')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </PerfectScrollbar>
        </div>
    )
}

export default History;
