import React from 'react';
import './Error.scss';

export default function Error({ message }) {
    return (
        <div className='error-container'>
            {message}
        </div>
    )
}
