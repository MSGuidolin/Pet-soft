import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  containerFooter: {
    position: "absolute",
    backgroundColor: "#02735E",
    width: "100%",
    height: 30,
  },
  footerCopyright: {
    color: "White",
    fontWeight: "bold",
    padding: 5,
    margin: "auto",
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" className={classes.containerFooter}>
      <Grid item container justifyContent="center" style={{ width: "100%" }}>
        <span className={classes.footerCopyright}>
          © Copyright 2021-2024 <a href="/about-Us">CESIT IES 9-023</a>
        </span>
      </Grid>
    </Grid>
  );
}

export default Footer;
