import React, { useEffect } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Image from "../../../img/banner.jpg"
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../Redux/actions/user.actions";
import "./UserBanner.scss";

const ID = window.localStorage.getItem("loggedSpatifyApp")
  ? JSON.parse(window.localStorage.getItem("loggedSpatifyApp"))
  : null;


const useStyles = makeStyles(() => ({
  userProfile: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  gridItem: {
    width: '70%',
    height: 'auto',
  },
  gridBanner: {
    width: '100%',
    height: 'auto',
    alignSelf: 'flex-start',
  },
  gridProfile: {
    height: 'auto',
    width: 'auto',
  },
  gridForm: {
    height: 'auto',
    width: '80%',
  },
  paper: {
    margin: 'auto 10px',
    padding: 15,
  },
  containerBanner: {
    position: 'relative',
    textAlign: 'center',
    boxShadow: '0px 2px 2px #888888',
    marginBottom: 30,
    borderRadius: 3,
  },
  bannerText: {
    position: 'absolute',
    top: '20%',
    left: 16,
  },
  bannerTextSubt: {
    position: 'absolute',
    top: '40%',
    left: 16,
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
  },
  profileImg: {
    borderRadius: '50%',
    width: 300,
    height: 300,
  },
  bannerImg: {
    width: '100%',
    height: 'auto',
  },
  data: {
    marginTop: 20,
  },
  dataItems: {
    margin: '10px auto',
  },
  dataSubtitle: {
    fontWeight: 'bold',
  },
  dirItems: {
    margin: '5px auto',
  },
  divider: {
    margin: '20px auto',
  },
  buttonContainer: {
    margin: '30px auto 5px auto',
    width: 200,
  },
  select: {
    width: '100%',
  },
}));


function UserBanner() {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);

  useEffect(() => {
    dispatch(getUserProfile(ID.userFound._id));
  }, []);

  const classes = useStyles();
  return (
    <div className='banner-profile-container'>
      <Grid item className={classes.gridBanner} >
        <Box className={classes.containerBanner} >
          <img className={classes.bannerImg} src={Image} />
          <Typography variant="h4" className={classes.bannerText}>
            ¡Hola {userData && userData.firstName}!
          </Typography>
          <Typography variant="subtitle1" className={classes.bannerTextSubt}>
            En este espacio vas a poder ver y editar tu perfil y tambien consultar tus proximos turnos
          </Typography>
        </Box>
      </Grid>
      <div className='under-banner'>
        <Link to='/cart' className='under-button'>
          Ver Carrito de compras
        </Link>
      </div>
      <div className='under-banner'>
        <Link to='/perfil/historial' className='under-button'>
          Ver Historial de compras
        </Link>
      </div>
    </div>
  );
}

export default UserBanner;
