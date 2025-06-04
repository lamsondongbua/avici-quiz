import SideBar from "./SideBar";
import './Admin.scss'
import {FaBars} from 'react-icons/fa'
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation, Trans } from 'react-i18next'
import Language from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown'

const Admin  = (props) => {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed = {collapsed}/>
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside"/>
                    </span>
                    <div className="rightside">
                        <NavDropdown title={t('header.settings')} id="basic-nav-dropdown">
                            <NavDropdown.Item >{t('header.profile')}</NavDropdown.Item>
                            <NavDropdown.Item >{t('header.logout')}</NavDropdown.Item>
                        </NavDropdown>
                        <Language/>
                    </div>
                </div>

                <PerfectScrollbar>
                    <div className="admin-main">
                        <PerfectScrollbar>
                            <Outlet/>
                        </PerfectScrollbar>
                    </div>
                </PerfectScrollbar>
            </div>

        </div>
    )
}

export default Admin;