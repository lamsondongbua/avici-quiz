import { useState } from "react"
import { UpdatePassword } from "../../services/apiServices";
import { toast } from 'react-toastify';
import './Share.scss'
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
    const { t } = useTranslation();

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

    const handleConfirm = async () => {
        let response = await UpdatePassword(password, newPassword);
        if (newPassword === confirmPassword) {
            if (response && response.EC === 0) {
                toast.success(response.EM);
            } else {
                toast.error(response.EM);
            }
        } else {
            toast.error(t('changePassword.confirmError'));
        }
    }

    return (
        <div className="change-password-container">
            <div>
                <label className="running-label" htmlFor='currentPassword'>{t('changePassword.currentPassword')}</label>
                <input
                    id="currentPassword"
                    placeholder={t('changePassword.currentPasswordPlaceholder')}
                    value={password}
                    onChange={handleOnChangePassword}
                />
            </div>
            <div>
                <label className="running-label" htmlFor='newPassword'>{t('changePassword.newPassword')}</label>
                <input
                    id="newPassword"
                    placeholder={t('changePassword.newPasswordPlaceholder')}
                    value={newPassword}
                    onChange={handleOnChangeNewPassword}
                />
            </div>
            <div>
                <label className="running-label" htmlFor='confirmPassword'>{t('changePassword.confirmPassword')}</label>
                <input
                    id="confirmPassword"
                    placeholder={t('changePassword.confirmPasswordPlaceholder')}
                    value={confirmPassword}
                    onChange={handleOnChangeConfirmPassword}
                />
            </div>
            <button className="btn-animatic" onClick={handleConfirm}>
                {t('changePassword.confirmButton')}
            </button>
        </div>
    )
}

export default ChangePassword;
