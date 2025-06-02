import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import {FcPlus} from 'react-icons/fc'
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { useTranslation, Trans } from 'react-i18next'


const ManageUser = (props) => {
    //đây là biến giới hạn bao nhiêu phần tử có trong 1 trang
    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(0); 
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    // const handleShowHideModal = (value) => {
    //     setShowModalCreateUser(value);
    // }
    const [listUsers, setListUsers] = useState([])

    const [ID, setID] = useState();
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    //dùng cho ko phân trang
    // useEffect(() =>{
    //     fetchListUsers();
    // }, []);

    //dùng cho phân trang
    useEffect(() =>{
        fetchListUsersWithPaginate(1);
    }, []);

    //Dùng cho ko phân trang
    const fetchListUsers = async () =>{
        let response = await getAllUsers();
        if (response.EC === 0){
            setListUsers(response.DT);
        }
    }
    //dùng cho phân trang
    const fetchListUsersWithPaginate = async (page) =>{
        let response = await getUserWithPaginate(page,LIMIT_USER);
        if (response.EC === 0){
            setListUsers(response.DT.users);
            setPageCount(response.DT.totalPages);
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

    const handleClickBtnDelete = (user) =>{
        setShowModalDeleteUser(true);
        setDataDelete(user);
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
                    {/* Cái này dùng khi thích cuộn chuột dài ngoằng (có thanh scroll) */}
                    {/* <TableUser 
                        listUsers = {listUsers}
                        handleClickBtnUpdate = {handleClickBtnUpdate}
                        handleClickBtnView = {handleClickBtnView}
                        handleClickBtnDelete = {handleClickBtnDelete}
                    /> */}
                    {/* Phân thành nhiều trang như kết quả tìm kiếm bên google */}
                    <TableUserPaginate
                        listUsers = {listUsers}
                        handleClickBtnUpdate = {handleClickBtnUpdate}
                        handleClickBtnView = {handleClickBtnView}
                        handleClickBtnDelete = {handleClickBtnDelete}
                        fetchListUsersWithPaginate = {fetchListUsersWithPaginate}
                        pageCount = {pageCount}
                        currentPage = {currentPage}
                        setCurrentPage = {setCurrentPage}
                    />
                </div>
                <ModalCreateUser 
                    show = {showModalCreateUser} 
                    setShow = {setShowModalCreateUser}
                    // setShow = {handleShowHideModal}
                    fetchListUsers = {fetchListUsers}
                    fetchListUsersWithPaginate = {fetchListUsersWithPaginate}
                    currentPage = {currentPage}
                    setCurrentPage = {setCurrentPage}
                />
                <ModalUpdateUser
                    show = {showModalUpdateUser}
                    setShow = {setShowModalUpdateUser}
                    dataUpdate = {dataUpdate}
                    fetchListUsers = {fetchListUsers}
                    resetUpdateData = {resetUpdateData}
                    fetchListUsersWithPaginate = {fetchListUsersWithPaginate}
                    currentPage = {currentPage}
                    setCurrentPage = {setCurrentPage}
                />
                <ModalViewUser
                    show = {showModalViewUser}
                    setShow = {setShowModalViewUser}
                    listUsers = {listUsers}
                    ID = {ID}
                />
                <ModalDeleteUser
                    show = {showModalDeleteUser}
                    setShow = {setShowModalDeleteUser}
                    dataDelete = {dataDelete}
                    fetchListUsers = {fetchListUsers}
                    fetchListUsersWithPaginate = {fetchListUsersWithPaginate}
                    currentPage = {currentPage}
                    setCurrentPage = {setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser;