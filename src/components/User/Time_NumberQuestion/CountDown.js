import { useState, useEffect } from "react";
import { useTranslation, Trans } from 'react-i18next'

const CountDown = (props) => {
    const { t } = useTranslation();

    const {onTimeUp} = props;
    const [count, setCount] = useState(10);
    //hàm chuyển giây thành giờ và phút
    const toHHMMSS = (sesc) => {
        const sec_num = parseInt(sesc, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num / 60) % 60;
        const seconds = sec_num % 60;

        return [hours,minutes,seconds]
               .map(v => v < 10 ? '0' + v : v)
               .filter((v,i) => v !== '00' || i > 0)
               .join(":");
    } 

    useEffect(() => {

        if (count === 0){
            onTimeUp();
            return;
        } 
        const timer = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000); 
       //clear timer để mỗi lần re-render do biến count thay đổi ko tạo ra nhiều timer khác nhau
       return () => {
           clearInterval(timer);
       }
    },[count])
    
    return (
        <div className="countdown-container">
            {toHHMMSS(count)}
        </div>
    )
}

export default CountDown;