import { useTranslation, Trans } from 'react-i18next'
import './DashBoard.scss';
import {ResponsiveContainer,BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts'
import {getOverview} from '../../../services/apiServices';
import { useEffect, useState } from 'react';


const DashBoard = (props) => {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetchDataOverview();
    },[])

    const fetchDataOverview = async() => {
        let response = await getOverview();
        if (response && response.EC === 0){
            setDataOverview(response.DT);

            //process build data form for chart
            let Qz = 0, Qs = 0, As = 0 
            Qz = response?.DT?.others?.countQuiz;
            Qs = response?.DT?.others?.countQuestions;
            As = response?.DT?.others?.countAnswers;
            const data = [
                { name: "Quizzes", value: Qz, fill: "#59A14F" },
                { name: "Questions", value: Qs, fill: "#F28E2B" },
                { name: "Answers", value: As, fill: "#E15759" }
            ];
            setDataChart(data);            
        }
    }
    console.log(dataOverview);
    const { t } = useTranslation();
    return(
        <div className='dashboard-container'>
            <div className='title'>
                Analytics Dashboard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total Users</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users && dataOverview.users.total ?
                                <>{dataOverview.users.total}</>
                                : 
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizzes</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuiz ?
                                <>{dataOverview.others.countQuiz}</>
                                :
                                <>0</>
                            }

                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuestions ?
                                <>{dataOverview.others.countQuestions}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countAnswers ?
                                <>{dataOverview.others.countAnswers}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                <ResponsiveContainer width="95%" height={"100%"}>
                <BarChart data={dataChart} barSize={50}>
                    <CartesianGrid stroke="#e0e0e0" strokeDasharray="0" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0,200]} ticks={[0,25,50,75,100,125,150,175,200]} />
                    <Tooltip />
                    <Legend content={() => (
                    <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                        <div style={{ color: "#59A14F" }}>🟩 Qz</div>
                        <div style={{ color: "#F28E2B" }}>🟧 Qs</div>
                        <div style={{ color: "#E15759" }}>🟥 As</div>
                    </div>
                    )}/>
                    <Bar dataKey="value" />
                </BarChart>
                </ResponsiveContainer>
    
                </div>
            </div>
        </div>
    )
}

export default DashBoard;