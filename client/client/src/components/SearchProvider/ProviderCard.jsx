import React from "react";
import { Link } from "react-router-dom";

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

import "./ProviderCard.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: "4px 4px 30px #e1b2f0",
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
  cardTitle: {
    textDecoration: "underline",
  },
}));

export default function RecipeReviewCard({ data }) {
  const whatsApp = "https://web.whatsapp.com/";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [stateFav, setStateFav] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleFavorites = () => {
    setStateFav(!stateFav);
  };

  return (
    <div className="card-provider">
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
          title={data.name ? data.name : `${data.firstName} ${data.lastName}`}
          subheader={data.price ? `$ ${data.price}` : ""}
        />
        <Link to={`/providers/${data._id}`}>
          <CardMedia
            className={classes.media}
            image='https://www.dietox.es/blog/wp-content/uploads/2017/03/spa4.png'
            title="Paella dish"
          />
        </Link>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <div>
              {" "}
              <h1>{`${data.addresses[0]?.city} / ${data.addresses[0]?.state} `}</h1>
            </div>
            {data.services &&
              "Haz click en la flecha hacia abajo para ver MÁS..."}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
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
          >
            <WhatsAppIcon />
          </IconButton>

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
                <Typography paragraph className={classes.cardTitle}>
                  {" "}
                  <b>Servicio(s):</b>
                </Typography>
                <Typography paragraph className={classes.cardContent}>
                  {data.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </Typography>

                <Typography paragraph className={classes.cardTitle}>
                  <b>Correo:</b>
                </Typography>
                <Typography paragraph className={classes.cardContent}>
                  {data.email}
                </Typography>

                <Typography paragraph className={classes.cardTitle}>
                  <b>Teléfono:</b>
                </Typography>
                <Typography paragraph>{data.phone}</Typography>

                <Typography paragraph className={classes.cardTitle}>
                  <b>Género:</b>
                </Typography>
                <Typography paragraph>{data.gender}</Typography>
              </>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
