import React, { useEffect } from 'react';
import axios from 'axios';



const ConfirmationMailProvider = (props) => {
const { match: { params } } = props;
    console.log(params.id) 

        useEffect(()=>{
            axios.put(`http://localhost:3002/providers/${params.id}`,{
                confirm: true, 
            })
            .then((data)=> console.log(data))
        },[params.id])
   
        return (
            <div>
              <h1>
                  Tu email fue confirmado, ya podes acceder a tu cuenta. 
              </h1>
            </div>
        );
    }


export default ConfirmationMailProvider;