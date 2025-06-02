import './App.scss'
import Header from './components/Header/Header';
import {Outlet} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation, Trans } from 'react-i18next'

const App = () =>{
  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header/>
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>
        
        </div>
        <div className='app-content'>
          {/* outlet là một component đặc biệt được dùng để hiển thị các route con - đặt outlet ở phần route con sẽ được render */}
          <PerfectScrollbar>
            <Outlet/>
          </PerfectScrollbar>  
        </div>
      </div>

      
    </div> 
  )
}

export default App;
