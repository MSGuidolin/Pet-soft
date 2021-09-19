import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { IconButton, Avatar } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

//select
import InputSelect from "./InputSelect";
import { red, green, orange } from "@material-ui/core/colors";

import {
  addAdressesToProvider,
  getProviderDetails,
  updateProfileProvider,
} from "../../../Redux/actions/actions";
import CheckBoxComponent from "../CheckBox/CheckBoxComponent";
import MaterialUIPickers from "../SelectHour/SelectorHour";

//styles

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  icon: {
    transform: "scale(1.0, 1.0) rotate(0deg)",
    transition: "",
    "&:hover": {
      transform: "scale(1.2, 1.2) rotate(270deg)",
      transition: "transform 0.5s ease-in-out",
    },
    color: red[500],
  },
  addAdresses: {},
}));

export default function FormAdresses({ type, alldata, data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [principal, setPrincipal] = useState(false);

  const { data: actualProvider } = useSelector(
    (state) => state.providerDetails
  );

  const provider = JSON.parse(window.localStorage.getItem("loggedSpatifyApp"));

  const initialStateProfile = {
    provider: provider.providerFound?._id,
  };
  const initialAddresses = {
    name: "",
    is_main: principal,
    provider: provider.providerFound?._id,
  };
  let state;
  if (type === "profile") {
    state = initialStateProfile;
  } else {
    state = initialAddresses;
  }
  const [dataAdress, setDataAdress] = useState(state);

  useEffect(() => {
    dispatch(getProviderDetails(provider.providerFound?._id));
  }, [dispatch]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = () => {
    setPrincipal(!principal);
    setDataAdress({
      ...dataAdress,
      is_main: !principal,
    });
  };

  const handleChange = (e) => {
    setDataAdress({
      ...dataAdress,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type !== "profile") {
      dispatch(addAdressesToProvider(dataAdress));
      setDataAdress({});
      setOpen(false);
      window.localStorage.setItem(
        "loggedSpatifyApp",
        JSON.stringify({ providerFound: actualProvider })
      );
    } else {
      dispatch(updateProfileProvider(dataAdress));
      setDataAdress({});
      setOpen(false);
      window.localStorage.setItem(
        "loggedSpatifyApp",
        JSON.stringify({ providerFound: actualProvider })
      );
    }
  };

  return (
    <>
      {type === "horarios" && (
        <div>
          <Avatar>
            <IconButton onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
          </Avatar>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {"Actualiza tus horarios de trabajo"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {
                  "Este es un espacio en el que podrás actualizar los horarios de trabajo cuando lo desees."
                }
              </DialogContentText>
              <MaterialUIPickers />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                CANCELAR
              </Button>
              <Button onClick={handleSubmit} color="primary">
                ENVIAR
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {type === "service" && (
        <div>
          <Avatar>
            <IconButton onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
          </Avatar>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {"Actuliza los servicios a prestar"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {
                  "Éste es un espacio en el que podrás actualizar los servicios a prestar. Puedes realizarlo en cualquier momento 😉."
                }
              </DialogContentText>

              <CheckBoxComponent data={alldata} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                CANCELAR
              </Button>
              <Button onClick={handleSubmit} color="primary">
                ENVIAR
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {type !== "service" && type !== "horarios" ? (
        <div>
          {type === "profile" || type === "addresses" ? (
            <Avatar className={classes.icon}>
              <IconButton onClick={handleClickOpen}>
                <EditIcon />
              </IconButton>
            </Avatar>
          ) : (
            <Button color="secondary" onClick={handleClickOpen}>
              AGREGAR
            </Button>
          )}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {type === "profile"
                ? "Actualiza tus datos personales"
                : "Ingresa tu dirección"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {type === "profile"
                  ? "Es importante que completes todos los campos requeridos !"
                  : "Es importante que llenes los siguientes campos ya que podrás ser contactado por usuarios que se encuentren cerca de tu ubicación 😉."}

                <DialogContentText>
                  {type === "profile"
                    ? "Nota: Una vez ingresados los datos haz 'Click' en enviar 👇"
                    : "Nota: para agregar una nueva dirección debes completar todos los campos de este formulario y enviarlo. Luego podrás dar 'Click' en 'AGREGAR' e ingresar tu nueva dirección."}
                </DialogContentText>
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                label={type === "profile" ? "Nombre" : "Pais"}
                type="text"
                fullWidth
                name={type === "profile" ? "firstName" : "country"}
                onChange={handleChange}
                defaultValue={
                  type === "profile"
                    ? data?.firstName
                    : type === "addresses" && Array.isArray(data)
                    ? data[0]?.country
                    : ""
                }
              />
              <TextField
                autoFocus
                margin="dense"
                label={type === "profile" ? "Apellido" : "Estado"}
                type="text"
                fullWidth
                name={type === "profile" ? "lastName" : "state"}
                onChange={handleChange}
                defaultValue={
                  type === "profile"
                    ? data?.lastName
                    : type === "addresses"
                    ? data && data[0]?.state
                    : ""
                }
              />
              <TextField
                autoFocus
                margin="dense"
                label={type === "profile" ? "Correo (email)" : "Ciudad"}
                type="email"
                fullWidth
                name={type === "profile" ? "email" : "city"}
                onChange={handleChange}
                defaultValue={
                  type === "profile"
                    ? data?.email
                    : type === "addresses"
                    ? data?.length
                      ? data[0].city
                      : ""
                    : ""
                }
              />
              <TextField
                autoFocus
                margin="dense"
                label={type === "profile" ? "Telefóno" : "Dirección"}
                type="email"
                fullWidth
                name={type === "profile" ? "phone" : "address_1"}
                onChange={handleChange}
                defaultValue={
                  type === "profile"
                    ? data?.phone
                    : type === "addresses"
                    ? data?.length
                      ? data[0].address_1
                      : "  "
                    : ""
                }
              />
              <TextField
                autoFocus
                margin="dense"
                label={
                  type === "profile"
                    ? "Acerca de mí"
                    : "Detalles adicionales (ej: depto 101, torre 2, 2da reja)"
                }
                type="text"
                fullWidth
                name={type === "profile" ? "bio" : "address_details"}
                onChange={handleChange}
                defaultValue={
                  type === "profile"
                    ? data?.bio
                    : type === "addresses"
                    ? data?.length
                      ? data[0].address_details
                      : "  "
                    : ""
                }
              />
              <TextField
                autoFocus
                margin="dense"
                label={type === "profile" ? "Edad" : "Código postal"}
                type="text"
                fullWidth
                name={type === "profile" ? "age" : "zip_code"}
                onChange={handleChange}
                defaultValue={
                  type === "profile"
                    ? data?.age
                    : type === "addresses"
                    ? data?.length
                      ? data[0].zip_code
                      : ""
                    : ""
                }
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                CANCELAR
              </Button>
              <Button onClick={handleSubmit} color="primary">
                ENVIAR
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </>
  );
}
