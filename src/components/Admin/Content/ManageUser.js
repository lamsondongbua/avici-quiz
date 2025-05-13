import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import {FcPlus} from 'react-icons/fc'
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    // const handleShowHideModal = (value) => {
    //     setShowModalCreateUser(value);
    // }
    const [listUsers, setListUsers] = useState([])

    const [ID, setID] = useState();
    
    useEffect(() =>{
        fetchListUsers();
    }, []);

    const fetchListUsers = async () =>{
        let response = await getAllUsers();
        if (response.EC === 0){
            setListUsers(response.DT);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        console.log('Update user: ', user)
        setDataUpdate(user);
    }

    const handleClickBtnView = (id) => {
        setID(id);
        setShowModalViewUser(true);
    }
    const resetUpdateData = () =>{
        setDataUpdate({});
    }

    return(
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>

            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-info" onClick={() => setShowModalCreateUser(true)}> <FcPlus/> Add new users</button>
                </div>
                <div className="table-users-container">
                    <TableUser 
                        listUsers = {listUsers}
                        handleClickBtnUpdate = {handleClickBtnUpdate}
                        handleClickBtnView = {handleClickBtnView}
                    />
                </div>
                <ModalCreateUser 
                    show = {showModalCreateUser} 
                    setShow = {setShowModalCreateUser}
                    // setShow = {handleShowHideModal}
                    fetchListUsers = {fetchListUsers}
                />
                <ModalUpdateUser
                    show = {showModalUpdateUser}
                    setShow = {setShowModalUpdateUser}
                    dataUpdate = {dataUpdate}
                    fetchListUsers = {fetchListUsers}
                    resetUpdateData = {resetUpdateData}
                />
                <ModalViewUser
                    show = {showModalViewUser}
                    setShow = {setShowModalViewUser}
                    listUsers = {listUsers}
                    ID = {ID}
                />
            </div>
        </div>
    )
}

export default ManageUser;