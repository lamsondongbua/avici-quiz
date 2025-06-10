import { useTranslation } from 'react-i18next'
import './DashBoard.scss';
import {
    ResponsiveContainer, BarChart, CartesianGrid,
    XAxis, YAxis, Tooltip, Legend, Bar
} from 'recharts';
import { getOverview } from '../../../services/apiServices';
import { useEffect, useState } from 'react';

const DashBoard = () => {
    const { t } = useTranslation();
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, []);

    const fetchDataOverview = async () => {
        let response = await getOverview();
        if (response && response.EC === 0) {
            setDataOverview(response.DT);

            // Build data for chart
            const Qz = response?.DT?.others?.countQuiz || 0;
            const Qs = response?.DT?.others?.countQuestions || 0;
            const As = response?.DT?.others?.countAnswers || 0;
            const data = [
                { name: t("dashboard.chart.quizzes"), value: Qz, fill: "#59A14F" },
                { name: t("dashboard.chart.questions"), value: Qs, fill: "#F28E2B" },
                { name: t("dashboard.chart.answers"), value: As, fill: "#E15759" }
            ];
            setDataChart(data);
        }
    };

    return (
        <div className='dashboard-container'>
            <div className='title'>
                {t("dashboard.title")}
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>{t("dashboard.totalUsers")}</span>
                        <span className='text-2'>
                            {dataOverview?.users?.total || 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t("dashboard.totalQuizzes")}</span>
                        <span className='text-2'>
                            {dataOverview?.others?.countQuiz || 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t("dashboard.totalQuestions")}</span>
                        <span className='text-2'>
                            {dataOverview?.others?.countQuestions || 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t("dashboard.totalAnswers")}</span>
                        <span className='text-2'>
                            {dataOverview?.others?.countAnswers || 0}
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="95%" height={"100%"}>
                        <BarChart data={dataChart} barSize={50}>
                            <CartesianGrid stroke="#e0e0e0" strokeDasharray="0" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 200]} ticks={[0, 25, 50, 75, 100, 125, 150, 175, 200]} />
                            <Tooltip />
                            <Legend content={() => (
                                <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                                    <div style={{ color: "#59A14F" }}>🟩 {t("dashboard.chart.qz")}</div>
                                    <div style={{ color: "#F28E2B" }}>🟧 {t("dashboard.chart.qs")}</div>
                                    <div style={{ color: "#E15759" }}>🟥 {t("dashboard.chart.as")}</div>
                                </div>
                            )} />
                            <Bar dataKey="value" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
