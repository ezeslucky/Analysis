/* eslint-disable prettier/prettier */
'use client';
import ProfileHeader from './ProfileHeader';
import ProfileSettings from './ProfileSettings';


export default function () {
  return (
    <div className="mx-auto">
      <ProfileHeader />
      <ProfileSettings />
    </div>
  );
}
