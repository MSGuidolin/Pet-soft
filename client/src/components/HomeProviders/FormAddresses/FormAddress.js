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
import { toast } from 'react-toastify';
import MenuItem from '@material-ui/core/MenuItem';

//select
import InputSelect from "./InputSelect";
import { red, green, orange } from "@material-ui/core/colors";

import {
  addAddressesToProvider,
  updateProviderAddress,
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
  addAddresses: {},
}));

const Departamentos = [
  // {
  //   selected: true,
  //   hidden: true,
  //   label: 'Selecciona tu departamento'
  // },  
  {
    value: 'Capital',
    label: 'Capital'
  },
  {
    value: 'General Alvear',
    label: 'General Alvear'
  },
  {
    value: 'General San Martín',
    label: 'General San Martín'
  },
  {
    value: 'Godoy Cruz',
    label: 'Godoy Cruz'
  },
  {
    value: 'Guaymallén',
    label: 'Guaymallén'
  },
  {
    value: 'Junín',
    label: 'Junín'
  },
  {
    value: 'La Paz',
    label: 'La Paz'
  },
  {
    value: 'Las Heras',
    label: 'Las Heras'
  },
  {
    value: 'Lavalle',
    label: 'Lavalle'
  },
  {
    value: 'Luján de Cuyo',
    label: 'Luján de Cuyo'
  },
  {
    value: 'Maipú',
    label: 'Maipú'
  },
  {
    value: 'Malargüe',
    label: 'Malargüe'
  },
  {
    value: 'Rivadavia',
    label: 'Rivadavia'
  },
  {
    value: 'San Carlos',
    label: 'San Carlos'
  },
  {
    value: 'San Rafael',
    label: 'San Rafael'
  },
  {
    value: 'Santa Rosa',
    label: 'Santa Rosa'
  },
  {
    value: 'Tunuyán',
    label: 'Tunuyán'
  },
  {
    value: 'Tupungato',
    label: 'Tupungato'
  },
]

export default function FormAddresses({ type, alldata, data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [principal, setPrincipal] = useState(false);

  const { data: actualProvider } = useSelector(
    (state) => state.providerDetails
  );

  const provider = JSON.parse(window.localStorage.getItem("loggedPetSoftApp"));

  const initialStateProfile = {
    provider: provider.providerFound?._id,
  };
  const initialAddresses = {
    name: "test",
    is_main: principal,
    provider: provider.providerFound?._id,
  };
  let state;
  if (type === "profile") {
    state = initialStateProfile;
  } else {
    state = initialAddresses;
  }
  const [dataAddress, setDataAddress] = useState({
    ...data,
    provider: provider.providerFound._id
  });

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
    setDataAddress({
      ...dataAddress,
      is_main: !principal,
    });
  };

  const handleChange = (e) => {
    setDataAddress({
      ...dataAddress,
      [e.target.name]: e.target.value,
      // name: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type !== "profile") {
      if (!dataAddress._id) {
        dispatch(addAddressesToProvider(dataAddress));
      } else {
        dispatch(updateProviderAddress(dataAddress.provider, dataAddress._id, dataAddress));
      }
      setDataAddress({});
      setOpen(false);
      toast.success(
        `👍 Dirección almacenada, por favor continúe`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      window.localStorage.setItem(
        "loggedPetSoftApp",
        JSON.stringify({ providerFound: actualProvider })
      );
    } else {
      dispatch(updateProfileProvider(dataAddress));
      setDataAddress({});
      setOpen(false);
      window.localStorage.setItem(
        "loggedPetSoftApp",
        JSON.stringify({ providerFound: actualProvider })
      );
    }
    window.location.reload(true);

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
              {"Actualiza los servicios a prestar"}
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

              {type != "profile" &&
                <TextField
                  autoFocus
                  margin="dense"
                  label="País"
                  type="text"
                  fullWidth
                  name="country"
                  onChange={handleChange}
                  defaultValue={
                    type === "profile"
                      ? data?.firstName
                      : type === "addresses"
                        ? data?.country
                        : ""
                  }
                />
              }
              <TextField
                margin="dense"
                label={type === "profile" ? "Nombre" : "Provincia"}
                type="text"
                fullWidth
                name={type === "profile" ? "lastName" : "state"}
                onChange={handleChange}
                defaultValue={
                  type === "profile"
                    ? data?.lastName
                    : type === "addresses"
                      ? data && data?.state
                      : ""
                }
              />
              {type != "profile" &&
                <TextField
                  margin="dense"
                  fullWidth
                  name="city"
                  id="standard-select-currency"
                  select
                  label="Departamento"
                  defaultValue="Capital"
                  // helperText="Elige tu departamento"
                  variant="standard"
                  onChange={handleChange}
                >
                  {Departamentos.map((option) => (
                    <MenuItem key={option.value} value={option.value} selected={option.value === data.city}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              }
              <TextField
                autoFocus
                margin="dense"
                label={type === "profile" ? "Telefóno" : "Dirección"}
                type="text"
                fullWidth
                name={type === "profile" ? "phone" : "direction"}
                onChange={handleChange}
                defaultValue={
                  type === "profile"
                    ? data?.phone
                    : type === "addresses"
                        ? data.direction
                        : ""
                }
              />
              <TextField
                margin="dense"
                label={type === "profile" ? "Información" : "Detalles"}
                type="text"
                fullWidth
                name={type === "profile" ? "bio" : "address_details"}
                onChange={handleChange}
                defaultValue={
                  type === "profile"
                    ? data?.bio
                    : type === "addresses"
                        ? data.address_details
                        : "  "
                }
              />
              {type != "profile" &&
                <TextField
                  name="postal_code"
                  margin="dense"
                  label="Código Postal"
                  type="text"
                  fullWidth
                  onChange={handleChange}
                  defaultValue={
                    type === "profile"
                      ? data?.age
                      : type === "addresses"
                          ? data.postal_code
                          : ""
                  }
                />
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                CANCELAR
              </Button>
              <Button onClick={handleSubmit} color="primary">
                ACTUALIZAR
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </>
  );
}
