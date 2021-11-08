import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './PetCard.scss';
import axios from 'axios';

function PetCard({ image, name, age, race, animal, userID }) {

    const handleClick = () => {
        axios.delete(`http://localhost:3002/pets/${userID}/${name}`);

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
                    <Typography gutterBottom variant="h5" component="div">
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
                </CardContent>
                <CardActions>
                    <Button onClick={handleClick} size="small">Eliminar</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default PetCard;