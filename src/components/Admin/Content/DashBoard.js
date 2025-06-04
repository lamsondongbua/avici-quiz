import { useTranslation, Trans } from 'react-i18next'
import './DashBoard.scss';
import {ResponsiveContainer,BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts'

const DashBoard = (props) => {
    const { t } = useTranslation();
    const data = [
        {
          "name": "Quizzes",
          "Qz": 29,
        },
        {
          "name": "Questions",
          "Qs": 76,
        },
        {
          "name": "Answers",
          "As": 52,
        }
    ]
    return(
        <div className='dashboard-container'>
            <div className='title'>
                Analytics Dashboard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total Users</span>
                        <span className='text-2'>100</span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizzes</span>
                        <span className='text-2'>55</span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>103</span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>3402</span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="95%" height={"100%"}>
                        <BarChart data={data}>
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="0" vertical={false} />
                        <XAxis dataKey="name" />
                            <YAxis domain={[0,100]} ticks={[0,25,50,75,100]}/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#59A14F" />
                            <Bar dataKey="Qs" fill="#F28E2B" />
                            <Bar dataKey="As" fill="#E15759" />
                        </BarChart>
                    </ResponsiveContainer>    
                </div>
            </div>
        </div>
    )
}

export default DashBoard;