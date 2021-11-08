import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../img/banner.png';
import { data } from '../../utils/covidData';

const useStyles = makeStyles(() => ({
    bannerImg: {
        width: '80%'
    },
    bannerContainer: {
        position: 'relative',
        textAlign: 'center',
        width: '100%'
    },
    bannerText: {
        position: 'absolute',
        top: '20%',
        left: "5%",
        color: "rgb(121, 47, 111)",
        padding: 10,
        textShadow: '0 0 10px white, 0 0 10px white'
    },
    bannerSubtitle: {
        position: "absolute",
        top: "40%",
        left: "6%",
        color: "rgb(121, 47, 111)",
        padding: 10,
        width: "40%",
        fontSize: "1.1rem",
        textShadow: '0 0 10px white, 0 0 10px white'
    },
    containerMain: {
        width: '90vw'
    },
    container: {
        width: '40%',
        padding: 20,
        borderBottom: '5px solid hsl(190, 50%,30%)',
        margin: 40
    },
    containerCard: {
        width: 'auto'
    },
    containerText: {
        width: '30%'
    },
    containerTitle: {
        marginBottom: 10,
        color: 'hsl(308deg 30% 33%)'
    },
    img: {
        width: 'auto',
    },
    containerImg: {
        width: '100%',
    }
}));

function CovidProtocol() {
    const classes = useStyles();
    return (
        <div className='container-main'>
            <div className='container'>
                <Grid container direction='column' className={classes.containerMain}>

                    <Grid item container direction='column'>
                        <Grid item container direction='row'>
                            <div className={classes.bannerContainer}>
                                <img className={classes.bannerImg} src={Image} />
                                <Typography className={classes.bannerText} variant='h3'>En Pet-soft nos cuidamos entre todos</Typography>
                                <Typography className={classes.bannerSubtitle} variant='h5'>
                                    A continuación te detallamos los protocolos y medidas de seguridad que debemos
                                    tomar todos para poder brindar un servicio seguro y sin riesgos ante la pandemia
                                    de COVID-19.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container justifyContent='space-evenly'>
                        {
                            data.map((d, i) => {
                                return (
                                    <Grid key={i} item container direction='row' justifyContent='space-evenly' className={classes.container}>
                                        <Grid item className={classes.containerText}>
                                            <Typography variant='h4' className={classes.containerTitle}>
                                                {d.title}
                                            </Typography>
                                            <Typography variant='subtitle1'>
                                                {d.subtitle}
                                            </Typography>
                                        </Grid>
                                        <Grid item container className={classes.containerCard} alignContent='flex-end'>
                                            <div className={classes.containerImg}>
                                                <img className={classes.img} src={d.img} />
                                            </div>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}

export default CovidProtocol
