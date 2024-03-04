import React from "react";
import { Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  containerFooter: {
    position: "absolute",
    backgroundColor: "#00695c",
    width: "100%",
    height: 100,
  },
  containerFooterCopyright: {
    position: "absolute",
    width: "20%",
    left: 20,
    bottom: 5,
  },
  containerFooterLinks: {
    "& p": {
      margin: "10px auto",
      color: "white",
      fontWeight: "bold",
    },
    "& a": {
      textDecoration: "none",
    },
  },
  footerLinksDivider: {
    height: 40,
    borderRight: "2px solid #76ff03",
  },
  footerCopyright: {
    color: "White",
    fontWeight: "bold",
    padding: 5,
    margin: "auto auto 10px 10px",
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" className={classes.containerFooter}>
      <Grid item container justifyContent="space-evenly" style={{ width: "100%" }}>

        <Grid
          item
          container
          justifyContent="flex-end"
          className={classes.containerFooterCopyright}
        >
          <span className={classes.footerCopyright}>
            © Copyright 2021-2024 <a href="/about-Us">CESIT</a>
          </span>
        </Grid>

        {/* <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Grid item container justifyContent='center' alignItems="center" className={classes.containerFooterLinks}>
            <Grid item>
              <Link to="/login">
                <p>Ingresar</p>
              </Link>
            </Grid>
            <Divider
              component="p"
              className={classes.footerLinksDivider}
            />
            <Grid item>
              <Link to="/userRegister">
                <p>Registrarse</p>
              </Link>
            </Grid>
            <Divider
              component="p"
              className={classes.footerLinksDivider}
            />
            <Grid item>
              <Link to="/about-PetSoft">
                <p>Sobre PetSoft</p>
              </Link>
            </Grid>
            <Divider
              component="p"
              className={classes.footerLinksDivider}
            />
            <Grid item>
              <Link to="/about-Us">
                <p>Sobre nosotros</p>
              </Link>
            </Grid>
          </Grid> 
        </Grid>*/}

      </Grid>
    </Grid>
  );
}

export default Footer;
