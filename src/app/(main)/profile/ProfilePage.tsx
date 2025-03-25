/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
'use client';
import ProfileHeader from './ProfileHeader';
import ProfileSettings from './ProfileSettings';
import styles from './ProfilePage.module.css';

export default function () {
  return (
    <div className={styles.container}>
      <ProfileHeader />
      <ProfileSettings />
    </div>
  );
}
