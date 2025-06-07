import { useState } from "react"
import { UpdatePassword } from "../../services/apiServices";
import { toast } from 'react-toastify';
import './Share.scss'
const ChangePassword = () => {
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleOnChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleOnChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
    }
    const handleOnChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }
    const handleConfirm = async() => {
        let response = await UpdatePassword(password,newPassword);
        console.log('xem thử validate current password như nào',response);
        if (newPassword === confirmPassword){
            if (response && response.EC === 0){
                toast.success(response.EM);
            }
            else{
                toast.error(response.EM);
            }
        }
        else{
            toast.error('The confirm password is not duplicate as new password');
        }
    }
    return (
        <div className="change-password-container">
            <div>
                <label className="running-label" for='currentPassword'>Current Password</label>
                <input id="currentPassword" placeholder="Enter the current password" value={password} onChange={(event) => handleOnChangePassword(event)} />
            </div>
            <div>
                <label className="running-label" for='newPassword'>New Password</label>
                <input id="newPassword" placeholder="Enter the new password" value={newPassword} onChange={(event) => handleOnChangeNewPassword(event)}/>
            </div>
            <div>
                <label className="running-label" for='confirmPassword'>Confirm New Password</label>
                <input id="confirmPassword" placeholder="Confirm the password" value={confirmPassword} onChange={(event) => handleOnChangeConfirmPassword(event)}/>
            </div>
            <button className="btn-animatic" onClick={() => handleConfirm()}>Confirm</button>
        </div>
    )
}
export default ChangePassword;