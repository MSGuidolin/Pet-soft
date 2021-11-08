import React from 'react';
import './ButtonGoogle.scss';

const ButtonGoogle = ({ handleClick }) => {
  return (
    <div className='google-btn' onClick={handleClick}>
      <div className='google-icon-wrapper'>
        <img
          className='google-icon'
          src='https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20190925201609%21Google_%22G%22_Logo.svg'
          alt='img-google'
        />
      </div>
      <p className='btn-text'>
        <b>Login con Google</b>
      </p>
    </div>
  );
};

export default ButtonGoogle;
