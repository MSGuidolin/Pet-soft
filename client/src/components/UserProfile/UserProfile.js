import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import defaultImg from '../../img/wall-cart.jpeg';
import { getUserReservations } from '../../Redux/actions/user.actions';
import UserProfileInfo from './UserProfileInfo/UserProfileInfo';
import UserReservations from './UserReservations/UserReservations';
import './UserProfile.css';
import UserBanner from './UserBanner/UserBanner';

function UserProfile() {
  return (
    <div className='container-main'>
      <div className='container'>
        <div className='user-profile-container'>
          <UserProfileInfo />
          <UserBanner />
          <UserReservations />       
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
