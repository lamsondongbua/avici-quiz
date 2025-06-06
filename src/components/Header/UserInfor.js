import React, { useState, useEffect } from 'react';
import styles from './UserInfor.module.scss';
import { updateUserInfor } from '../../services/apiServices';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';

const UserInfor = () => {
  const account = useSelector(state => state.user.account);

  const [username, setUsername] = useState(account.username || '');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  // Convert base64 string to File object to send to backend API
  const base64ToFile = (base64String, fileName) => {
    try {
      // Remove the part "data:image/png;base64," if exists
      const base64Data = base64String.includes('base64,')
        ? base64String.split('base64,')[1]
        : base64String;
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

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setUsername(account.username || '');
      if (account.image) {
        const convertedFile = base64ToFile(account.image, 'user-image.png');
        if (convertedFile) {
          setFile(convertedFile);
          setFileName('user-image.png');
        }
      } else {
        setFile(null);
        setFileName('');
      }
    }
  }, [account]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await updateUserInfor(username, file);
      if (response && response.EC === 0) {
        toast.success(response.EM || 'User info updated successfully');
        // Note: Redux store updates must happen elsewhere as API does not return user data.
      } else {
        toast.error(response.EM || 'Failed to update user info');
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Cannot update user information');
    }
  };

  return (
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
  );
};

export default UserInfor;

