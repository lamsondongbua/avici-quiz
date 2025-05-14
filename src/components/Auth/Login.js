import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import {toast} from 'react-toastify';
const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() =>{
        //validate


        //submit api
        let response = await postLogin(email,password);
        if (response && response.EC === 0 ){
            toast.success(response.EM);
            navigate('/');
        }
        if (response && Number(response.EC) !== 0){
            toast.error(response.EM);
        }
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button>Sign up</button>
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
                    <button className='btn-submit' onClick={() => handleLogin()}>Login to AVICI QUIZ</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => navigate('/')}> &#60; &#60; Go to homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;