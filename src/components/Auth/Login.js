import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner9 } from "react-icons/im";


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const handleLogin = async() =>{
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
        setIsLoading(true);
        //submit api
        let response = await postLogin(email,password);
        if (response && response.EC === 0 ){
            dispatch(doLogin(response));
            toast.success(response.EM);
            setIsLoading(false);
            navigate('/');
        }
        if (response && Number(response.EC) !== 0){
            toast.error(response.EM);
            setIsLoading(false);
        }
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate('/register')}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                AVICI QUIZ 
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type={'email'} className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type={'password'} className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <div>
                    <button className='btn-submit' onClick={() => handleLogin()} disabled={isLoading}>{isLoading === true && <ImSpinner9 className='loader-icon'/>}<span style={{paddingLeft: 10, paddingRight: 10}}>Login to AVICI QUIZ</span>{isLoading === true &&<ImSpinner9 className='loader-icon'/>}</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => navigate('/')}> &#60; &#60; Go to homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;