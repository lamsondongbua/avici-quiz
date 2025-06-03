import { useState } from "react";
import './Register.scss'
import {useNavigate} from 'react-router-dom'
import {postRegister} from '../../services/apiServices';
import {toast} from 'react-toastify'
import {VscEye, VscEyeClosed} from 'react-icons/vsc';
import Language from "../Header/Language";
import { useTranslation, Trans } from 'react-i18next'


const Register = (props) =>{
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [isShowPassword, setIsShowPassword] = useState(false);

    const navigate = useNavigate();
    
    
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleRegister = async() =>{
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail){
            toast.error('Invalid email');
            return;
        }
        if (!password){
            toast.error('Invalid password');
            return;
        }

        //submit api
        let response = await postRegister(email,password);
        if (response && response.EC === 0 ){
            toast.success(response.EM);
            navigate('/login');
        }
        if (response && Number(response.EC) !== 0){
            toast.error(response.EM);
        }
    }

    return (
        <div className="register-container">
            <div className='header'>
                <span>{t('register.haveAccount')}</span>
                <button onClick={() => navigate('/login')}>{t('register.login')}</button>
                <Language/>
            </div>
            <div className='title col-4 mx-auto'>
                {t('register.title')}
            </div>
            <div className='welcome col-4 mx-auto'>
                {t('register.welcome')}
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>{t('register.email')} (*)</label>
                    <input type={'email'} className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='form-group pass-group'>
                    <label>{t('register.password')} (*)</label>
                    <input type={isShowPassword ? "text" : 'password'} className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {isShowPassword ? 
                        <span className="icons-eye" onClick={() => setIsShowPassword(false)}>
                            <VscEye/>
                        </span>
                        :
                        <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed/>
                        </span>    
                    }
                </div>
                <div className="form-group">
                    <label>{t('register.username')}</label>
                    <input type={'text'} className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <button className="btn-submit" onClick={() => handleRegister()}>{t('register.createAccount')}</button>
                </div>
                <div className="text-center">
                    <span className="back" onClick={() => navigate('/')}>
                        &#60;&#60; {t('register.goHome')}
                    </span>
                </div>
            </div>
        </div>
    )

}

export default Register;
