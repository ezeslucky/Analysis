/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { Metadata } from 'next';
import ProfilePage from './ProfilePage';

export default function () {
  return <ProfilePage />;
}

export const metadata: Metadata = {
  title: 'Profile',
};
