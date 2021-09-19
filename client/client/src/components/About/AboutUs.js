import React from "react";
import { Grid, Box, Typography, IconButton } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../img/banner.jpg";
import { data } from '../../utils/aboutUsData';

const useStyles = makeStyles(() => ({
  bannerImg: {
    width: "100%",
  },
  bannerContainer: {
    position: "relative",
    textAlign: "center",
    width: "100%",
  },
  bannerText: {
    position: "absolute",
    top: "20%",
    left: "15%",
    color: "rgb(121, 47, 111)",
    padding: 10,
  },
  bannerSubtitle: {
    position: "absolute",
    top: "40%",
    left: "6%",
    color: "rgb(121, 47, 111)",
    padding: 10,
    width: "40%",
    fontSize: "1.1rem",
  },
  containerText: {
    padding: 15,
  },
  containerCard: {
    width: '80%',
    margin: '30px auto'
  },
  card: {
    width: '30%',
  },
  cardItems: {
    width: "80%",
    margin: '20px auto'
  },
  containerTextItem: {
    margin: '15px auto',
    width: "80%",
    textAlign: "center"
  },
  title: {
    color: "hsl(308deg 44% 33%)",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  subtitle: {
    color: "hsl(308deg 14% 33%)",
  },
  strong: {
    color: "hsl(308deg 44% 33%)",
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
  },
  profileImg: {
    borderRadius: '50%',
    width: 150,
    height: 150,
  },
  iconButton: {
    color: 'hsl(308deg 44% 70%)',
    '&:hover': {
      backgroundColor: 'hsl(308deg 44% 92%)',
      color: 'hsl(308deg 14% 50%)',
    }
  }
}));

function AboutUs() {
  const classes = useStyles();

  return (
    <div className="container-main">
      <div className="container">
        <Grid container direction="column">

          <Grid item container direction="column">
            <Grid item container direction="row">
              <div className={classes.bannerContainer}>
                <img className={classes.bannerImg} src={Image} />
                <Typography className={classes.bannerText} variant="h3">
                  Sobre nosotros
                </Typography>
                <Typography className={classes.bannerSubtitle}>
                  <b>Pet-Soft</b> Es el resultado del esfuerzo de 5 estudiantes del instituto de educación superior CESIT y
                  fué realizado como proyecto de último año y con el objetivo de la graduación del mismo.
                  <br />
                </Typography>
              </div>
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="column"
            alignItems="center"
            className={classes.containerText}
          >
            <Grid item className={classes.containerTextItem}>
              <Typography variant="h5">
                ¿Quiénes estan detrás de esta idea y proyecto de trabajo?
              </Typography>
            </Grid>
          </Grid>

          <Grid item container justifyContent='center' className={classes.containerCard} spacing={2}>
            {
              data.map((d, i) => {
                return (
                  <Grid
                    item
                    container
                    direction='row'
                    className={classes.card}
                    key={i}
                  >

                    <Grid item container direction="column" alignItems='center' className={classes.cardItems}>
                      <Box className={classes.image}>
                        <img
                          className={classes.profileImg}
                          src={d.image}
                          alt='img-actual-provider'
                        />
                      </Box>
                      <Typography className={classes.title}>{d.name}</Typography>
                      <Typography className={classes.subtitle}>
                        <a href={`mailto:${d.mail}`} target='_blank'>
                          <IconButton className={classes.iconButton}>
                            <EmailIcon />
                          </IconButton>
                        </a>
                        <a href={d.github} target='_blank'>
                          <IconButton className={classes.iconButton}>
                            <GitHubIcon />
                          </IconButton>
                        </a>
                        <a href={d.linkedin} target='_blank'>
                          <IconButton className={classes.iconButton}>
                            <LinkedInIcon />
                          </IconButton>
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default AboutUs;