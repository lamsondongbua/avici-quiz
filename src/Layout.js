import { BrowserRouter,Routes, Route } from "react-router-dom";
import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import {Bounce, ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Register from "./components/Auth/Register"
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/QuestionsAdmin/Questions";
import Test1 from "./routes/Test1";
import PrivateRoute from "./routes/PrivateRoute";
import {Suspense} from 'react';
import { useTranslation, Trans } from 'react-i18next'

const NotFound = () =>{
    const { t } = useTranslation();

    return (
        <div className="container mt-3 alert alert-danger">
            {t('layout.notFound')}
        </div>
    )
}
const Layout = (props) =>{
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element = {<App/>}>
                    <Route index element= {<HomePage/>}/>
                    <Route path='/users' element = {<PrivateRoute><ListQuiz/></PrivateRoute>}/>
                </Route>
                <Route path='/quiz/:id' element = {<DetailQuiz/>}/>
                <Route path='/admins' element = {<PrivateRoute><Admin/></PrivateRoute>}>
                    <Route index element= {<DashBoard/>}/>
                    <Route path='manage-users' element= {<ManageUser/>}/>
                    <Route path='manage-quizzes' element = {<ManageQuiz/>}/>
                    <Route path="manage-questions" element = {<Questions/>}/>
                </Route>

                <Route path='/login' element = {<Login/>}/>
                <Route path='/register' element= {<Register/>}/>
                <Route path='/test' element= {<PrivateRoute/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>


            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition= {Bounce}
            />
        </Suspense>
    )
}

export default Layout;