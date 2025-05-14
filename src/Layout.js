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

const Layout = (props) =>{
    return (
        <>
            <Routes>
                <Route path='/' element = {<App/>}>
                    <Route index element= {<HomePage/>}/>
                    <Route path='/users' element = {<User/>}/>
                </Route>
                <Route path='/admins' element = {<Admin/>}>
                    <Route index element= {<DashBoard/>}/>
                    <Route path='manage-users' element= {<ManageUser/>}/>
                </Route>

                <Route path='/login' element = {<Login/>}/>
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
        </>
    )
}

export default Layout;