import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation} from 'react-i18next'

const PrivateRoute = (props) => {
    const { t } = useTranslation();

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();

    if (!isAuthenticated){
        return <Navigate to="/login"></Navigate>
    }
    return (
        <div>
            {/* Cách 1 - gọi tên component con */}
            {/* <Test2>
                Muốn hiển thị component con phải gọi props.children bên component cha
                <Test1/>
            </Test2> */}

            <>
                {/* Cách thứ 2 - ko cần gọi tên component con vẫn in ra */}
                {props.children}
            
            </>
        </div>
    )
}

export default PrivateRoute;