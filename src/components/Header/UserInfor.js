import React from 'react';
import styles from './UserInfor.module.scss';

const UserInfor = ({ user }) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalHeader} id="modalTitle">User Profile Information</div>
      <div className={styles.profileInfo}>
        <div className={styles.profileLabel}>Email:</div>
        <div className={styles.profileValue}>{user.email}</div>

        <div className={styles.profileLabel}>Username:</div>
        <div className={styles.profileValue}>{user.username}</div>

        <div className={styles.profileLabel}>Password:</div>
        <div className={styles.profileValue}>{user.password}</div>
      </div>
    </div>
  );
};

export default UserInfor;
