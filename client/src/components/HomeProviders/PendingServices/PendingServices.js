import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LocationOnIcon from "@material-ui/icons/LocationOn";
//
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//
import "./PendingServices.scss";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    boxShadow: "4px 4px 30px #00695c",
    borderColor: "grey",
    filter: "saturate(80%)",
  },
  media: {
    height: 0,

    paddingTop: "56.25%", // 16:9

  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  favorite: {
    color: red[500],
  },
  whatsApp: {
    color: green[500],
  },
  font: {
    fontSize: "18px",
  },
}));

export default function RecipeReviewCard({ data }) {

  const whatsApp = "https://web.whatsapp.com/";
  const classes = useStyles();
  const history = useHistory();
  const loginData = useSelector((state) => state.loginData)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [stateFav, setStateFav] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleFavorites = () => {
    setStateFav(!stateFav);
  };
  //settings admin
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    history.push(`/service/upload/${data._id}`);
  };

  useEffect(() => { }, [data]);






  return (
    <div className="card-services">
      <Card className={classes.root}>
        <Typography variant="h3"></Typography>

        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={data.image}
            ></Avatar>
          }
          {...loginData.userFound?.roles[0].name !== "user" &&
            loginData.providerFound?.roles[0].name !== "provider"
            ?
            <div>

              <IconButton
                aria-label="settings"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEdit}>Editar 🖊</MenuItem>
                <MenuItem onClick={handleClose}>Remover</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>

            : null
          }


          id="simple-menu"

          title={data.name ? data.name : `${data.firstName} ${data.lastName}`}
          subheader={data.price ? `$ ${data.price}` : ""}
        />

        <Link to={`/services/providers/${data.name}`}>
          <CardMedia
            className={classes.media}
            image={data.image}
            title="Servicios"
          />
        </Link>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description && data.description.slice(0, 86).concat("...")}
            {data.services &&
              "Los servicios adquiridos y los datos principales del cliente se encuentran al desplegar la flecha..."}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton
            aria-label="add to favorites"
            onClick={handleFavorites}
            className={stateFav ? classes.favorite : ""}
          >
            <FavoriteIcon />
          </IconButton>

          <IconButton
            aria-label="share"
            className={classes.whatsApp}
            href={whatsApp}
            target="_blank"
          >
            <WhatsAppIcon />
          </IconButton> */}

          {data.addresses && (
            <IconButton aria-label="location">
              <LocationOnIcon />
            </IconButton>
          )}

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {data.description && (
              <>
                <Typography paragraph>Descripción:</Typography>
                <Typography paragraph>{data.description}</Typography>
              </>
            )}
            {data.services && (
              <>
                <Typography paragraph>Servicio(s):</Typography>
                <Typography paragraph>
                  {data.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </Typography>

                <Typography paragraph>Correo:</Typography>
                <Typography paragraph>{data.email}</Typography>

                <Typography paragraph>Teléfono:</Typography>
                <Typography paragraph>{data.phone}</Typography>

                <Typography paragraph>Género:</Typography>
                <Typography paragraph>{data.gender}</Typography>
              </>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
