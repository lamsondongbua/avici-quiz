import 'react-pro-sidebar/dist/css/styles.css';
import { GiAtomicSlashes } from "react-icons/gi";
import { GiSeaTurtle } from "react-icons/gi";
import './SideBar.scss'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { Link, useNavigate } from 'react-router-dom';


const SideBar = (props) =>{
    const navigate = useNavigate();
    const {image, collapsed, toggled, handleToggleSidebar} = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <GiAtomicSlashes size={'3em'} color={"red"}  />
                        <span onClick={() => navigate('/')} style={{marginLeft: "5px", cursor: 'pointer'}}>AVICI QUIZ</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            suffix={<span className="badge red">Main</span>}
                        >
                            Dashboard
                            <Link to="/admins"/>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>}
                            // icon={<FaRegLaughWink />}
                            icon = {<FaGem/>}
                            title="Features"
                        >
                            <MenuItem> 
                                Quản lý Users
                                <Link to="/admins/manage-users"/>
                            </MenuItem>
                            <MenuItem> 
                                Quản lý Bài Quiz
                                <Link to="/admins/manage-quizzes"/>
                            </MenuItem>
                            <MenuItem> 
                                Quản lý Câu Hỏi
                                <Link to= "/admins/manage-questions"/>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://www.facebook.com/tiendung.pham.1807?locale=vi_VN"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <GiSeaTurtle size={'2em'} color='#14e3fa' />
                            {!collapsed &&(
                                <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    AVICI FACEBOOK
                                </span>
                            )}
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar