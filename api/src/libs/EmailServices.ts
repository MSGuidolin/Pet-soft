import nodemailer from 'nodemailer';
import config from '../config';
import jwt from 'jsonwebtoken';



 const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "eugebutta90@gmail.com",
    pass: "ymprnuneozfqkufw"
  }
});


const sendCofirmationEmail = async (user:any) =>{
    
  let url= ""
   
   if(user.roles[0]?.name === "user"){
    url = `http://localhost:3000/confirmation/user/${user._id}`
   }else{
    url = `http://localhost:3000/confirmation/provider/${user._id}`
   }
   console.log(url)

    const msg = {
        from: 'Validation email  <no-replay@petsoft.com>',
        to: `${user.email}`,

        subject: 'Confima tu cuenta PetSoft ',
        html: `<h1> Bienvenidos a PetSoft</h1>
        <p> Hacé Click en el link para confirmar tu email
          <a href="${url}"> ${url} </a> </p>`

    };
   
   transporter.sendMail(msg, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
}


export default sendCofirmationEmail
