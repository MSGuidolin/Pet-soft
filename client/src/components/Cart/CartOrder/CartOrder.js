import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { HOST } from '../../../utils/constants';
import { toast } from 'react-toastify';
import './CartOrder.scss';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 500,
        height: 300,
        padding: 10,
        backgroundColor: '#ebebeb'
    },
    content: {
        height: '100%'
    },
    submit: {
        backgroundColor: '#43945c',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#295938',
            color: '#FFF'
        }
    },
    check: {
        backgroundColor: '#3F5AF1',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#142EBD',
            color: '#FFF'
        }
    },
    notAvailable: {
        backgroundColor: '#959595',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#959595',
        }
    },
    submitContent: {
        height: '40%'
    }
}))

function CartOrder({ total, itemLoading, response, props }) {
    const [userID, setUserID] = useState('');
    const [available, setAvailable] = useState(false);
    const [preferenceID, setPreferenceID] = useState(null);


    useEffect(() => {
        if (localStorage.getItem('loggedPetSoftApp')) {
            const storageData = JSON.parse(localStorage.getItem('loggedPetSoftApp'))
            if (storageData.userFound.roles[0].name === "user") {
                setUserID(storageData.userFound._id)
            }
        }
    }, [])

    useEffect(async () => {
        if (userID !== '') {
            if (props.location) {
                const status = props.location.search
                if (status.includes('status=approved')) {
                    await axios.get(`${HOST}/reservations/events/pay/${userID}`)
                    toast.success(`Todos los turnos fueron reservados exitosamente`, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
                await axios.get(`${HOST}/reservations/events/${userID}`)
                itemLoading()
            }
        }
    }, [userID])

    const handleCheck = async () => {
        response(true)
        try {
            const res = await axios.get(`${HOST}/reservations/events/${userID}`)
            if (res.data.error) {
                response(false)
                res.data.notAvailable.forEach((reservationDeleted) => {
                    toast.error(`Lo sentimos. El turno para 
                    ${reservationDeleted.service} del día 
                    ${reservationDeleted.date} a las 
                    ${reservationDeleted.hour}:00hs ya no se encuentra disponible`, {
                        position: toast.POSITION.TOP_CENTER
                    })
                })
            } else {
                response(false)
                toast.success(`Todos los turnos se encuentran disponibles`, {
                    position: toast.POSITION.TOP_CENTER
                })
                const mercadoPagoResponse = await axios.get(`${HOST}/checkout/${userID}`);
                if (mercadoPagoResponse.data.body) {
                    setPreferenceID(mercadoPagoResponse.data.body.id)
                    response(false)
                };
                setTimeout(function () { setAvailable(false); }, 5000);
            }
        } catch (error) {
            console.log(error)
        }
        itemLoading()
    }

    useEffect(() => {
        if (!available) {
            const form = document.getElementById('payment-form');
            const child = form.lastElementChild;
            if (child) {
                form.removeChild(child);
            }
        }
    }, [available])

    useEffect(() => {
        if (preferenceID) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src =
                'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
            script.setAttribute('data-preference-id', preferenceID);
            const form = document.getElementById('payment-form');
            const child = form.lastElementChild;
            if (child) {
                form.removeChild(child);
            }
            form.appendChild(script);
            setAvailable(true)
        }
    }, [preferenceID])

    const classes = useStyles();

    return (
        <Grid
            item
        >
            <Paper className={classes.paper}>
                <Grid container direction='column' justifyContent='space-between' className={classes.content}>
                    <Typography variant='h4' className={classes.title}>
                        Detalle de compra
                    </Typography>
                    <Grid item container justifyContent='space-between'>
                        <Grid item>
                            <Typography variant='subtitle1' color="textSecondary">
                                Subtotal
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='subtitle1' color="textSecondary">
                                {`$${total}`}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider variant="inset" />
                    <Grid item container justifyContent='space-between'>
                        <Grid item>
                            <Typography variant='body1'>
                                Total
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1'>
                                {`$${total}`}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction='column-reverse' className={classes.submitContent}>
                        <Grid item>
                            <Button onClick={handleCheck} fullWidth='true' className={classes.check}>
                                REVISAR DISPONIBILIDAD
                            </Button>
                            <form className='test' id='payment-form' method="GET"></form>
                            {
                                !available ? (
                                    <Button fullWidth='true' className={classes.notAvailable}>
                                        PAGAR
                                    </Button>
                                ) : null
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default CartOrder
