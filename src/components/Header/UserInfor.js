import React, { useState, useEffect } from 'react';
import { updateUserInfor } from '../../services/apiServices';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';
import styles from './UserInfor.module.scss';
// Giả định bạn có action này trong redux để cập nhật user info
import { doLogin } from '../../redux/action/userAction';

const UserInfor = () => {
  const dispatch = useDispatch();
  const account = useSelector(state => state.user.account);
  console.log('before', account);

  const [username, setUsername] = useState(account?.username || '');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(() =>
    account?.image ? 'User had image! Click here if you would like to change!!!' : 'Choose File'
  );

  // Convert base64 string to File object
  const base64ToFile = (base64String, fileName) => {
    try {
      const base64Data = base64String.includes('base64,') ? base64String.split('base64,')[1] : base64String;
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      return new File([byteNumbers], fileName, { type: 'image/png' });
    } catch (e) {
      console.error('Invalid base64 string', e);
      return null;
    }
  };

  // Sync local state with redux account changes
  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setUsername(account.username || '');
      if (account.image) {
        const convertedFile = base64ToFile(account.image, 'user-image.png');
        if (convertedFile) {
          setFile(convertedFile);
          setFileName('User had image! Click here if you would like to change!!!');
        }
      } else {
        setFile(null);
        setFileName('Choose File');
      }
    }
  }, [account]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async () => {
      const response = await updateUserInfor(username, file);
      if (response && response.EC === 0) {
        toast.success(response.EM);
        if (response.data) {
          console.log('check response bên API',response);
          // Dispatch redux update with new user data from API response
          dispatch(doLogin(response.data));
        }
      } 
      else {
        toast.error(response.EM);
      }
  };
  console.log('after', account);
  return (
    <div className='user_infor'>
      <div className={styles.modalContent} aria-labelledby="modalTitle" role="region">
      <h2 className={styles.modalHeader} id="modalTitle">User Profile Information</h2>
      <div className={styles.profileInfo}>
      <label htmlFor="username" className={styles.profileLabel}>Username:</label>
      <input
            id="username"
            className={styles.profileValue}
            value={username}
            onChange={handleUsernameChange}
            type="text"
            aria-required="true"
          />
      
          <label className={styles.profileLabel} htmlFor="imageUpload">Upload User Image:</label>
          <label htmlFor="imageUpload" className={styles.uploadButton} tabIndex={0}>
            {fileName || 'Choose File'}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </label>
        </div>
        <button onClick={handleSubmit} className={styles.updateButton} type="button">Update</button>
      </div>
    </div>
  );
};

export default UserInfor;

