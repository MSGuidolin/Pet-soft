import React from 'react';
import './ButtonGoogle.scss';

const ButtonGoogle = ({ handleClick }) => {
  return (
    <div className='google-btn' onClick={handleClick}>
      <div className='google-icon-wrapper'>
        <img
          className='google-icon'
          src='https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png'
          alt='img-google'
        />
      </div>
      <p className='btn-text'>
        <b>Ingresa con Google</b>
      </p>
    </div>
  );
};

export default ButtonGoogle;
