import React, { useEffect } from 'react';
import axios from 'axios';



const ConfirmationMail = (props) => {
const { match: { params } } = props;
    console.log(params.id) 

        useEffect(()=>{
            axios.put(`http://localhost:3002/users/${params.id}`,{
                confirm: true, 
            })
            .then((res)=> console.log(res.config))
        },[])
   
        return (
            <div>
              <h1>
                  Tu email fue confirmado, ya podes acceder a tu cuenta. 
              </h1>
            </div>
        );
    }


export default ConfirmationMail;