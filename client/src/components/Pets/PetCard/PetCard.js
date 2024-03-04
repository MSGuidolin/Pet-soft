import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './PetCard.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { render } from 'react-dom';



function PetCard({ image, name, animal, race, age, sex, userID, refreshPets }) {

    const seePet = () => {
        axios.get(`http://localhost:3002/pets/${userID}/${name}`);
    
        
    }
    // render  VERPET
    
    const editPet = () => {
        axios.get(`http://localhost:3002/pets/${userID}/${name}`);

        // edit pet

        refreshPets()
        toast.success(
            `Actualizaste los datos de ${name}.`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
    }

    const deletePet = async () => {
        await axios.delete(`http://localhost:3002/pets/${userID}/${name}`);
        refreshPets()
        toast.success(
            `${name} ha sido eliminado de tus mascotas.`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
    }


    return (
        <div className='pet-card'>
            <Card sx={{ width: 300 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={image}
                />
                <CardContent>
                    <Typography textAlign="center" gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Especie: {animal}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Raza: {race}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Edad: {age}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sexo: {sex}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={seePet} size="small" variant="contained" color="success" >Ver</Button>
                    <Button onClick={editPet} size="small" variant="contained" >Editar</Button>
                    <Button onClick={deletePet} size="small" variant="contained" color="error" >Eliminar</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default PetCard;