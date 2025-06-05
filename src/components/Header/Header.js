import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiServices';
import {toast} from 'react-toastify'
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next'
import { GiDiceTarget } from "react-icons/gi";
import Profile from './Profile';
import { useState } from 'react';

const Header = () => {
  const { t } = useTranslation();
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = () =>{
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogOut = async() => {
    let response = await logout("account.email", account.refresh_token);
    if (response && response.EC === 0){
      //clear data redux
      dispatch(doLogout());
      navigate('/login');

    }
    else{
      toast.error(response.EM);
    }
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to='/' className='navbar-brand'> <GiDiceTarget className='brand-icon'/>  {t('header.brand')}</NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className='nav-link'>{t('header.home')}</NavLink>
              <NavLink to="/users" className='nav-link'>{t('header.users')}</NavLink>
              <NavLink to="/admins" className='nav-link'>{t('header.admin')}</NavLink>
            </Nav>
            <Nav>
              {isAuthenticated === false ?
                <>
                  <button className='btn-login' onClick={() => handleLogin()}>{t('header.login')}</button>
                  <button className='btn-signup' onClick={() => handleRegister()}>{t('header.signup')}</button>
                </>
                :
                <NavDropdown title={t('header.settings')} id="basic-nav-dropdown">
                  <NavDropdown.Item ><span onClick={() => setIsShowModalProfile(true)}>{t('header.profile')}</span></NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.logout')}</NavDropdown.Item>
                </NavDropdown>
              }
              <Language/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>  
      <Profile
        show = {isShowModalProfile}
        setShow = {setIsShowModalProfile}
      />
    </>
  );
}

export default Header;