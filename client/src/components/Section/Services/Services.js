import React, { useEffect } from 'react';
/* import { RiServiceLine } from "react-icons/ri"; */
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../../Redux/actions/actions';
import RecipeReviewCard from '../../HomeProviders/PendingServices/PendingServices';

import './Services.css';

export function Services() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <div>
      <h1 className='title'>SERVICIOS</h1>
      <div className='services-container'>
        {services.data &&
          services.data.map((service, index) => (
            <RecipeReviewCard data={service} key={index} />
          ))}
      </div>
    </div>
  );
}

export default Services;
