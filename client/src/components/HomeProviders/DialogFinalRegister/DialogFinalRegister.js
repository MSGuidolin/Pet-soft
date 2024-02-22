import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

//
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { getProviderDetails } from '../../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, logout } from '../../../Redux/actions/user.actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  modal: {
    boxShadow: '5px 5px 5px blue',
    border: '5px solid red',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function DialogFinalRegister({ nameBoton, providerID }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: actualProvider } = useSelector(
    (state) => state.providerDetails
  );
  const [open, setOpen] = React.useState(false);
  const [EMAIL, setEMAIL] = React.useState('');
  const loginData = useSelector((state) => state.loginData);

  useEffect(() => {
    dispatch(getProviderDetails(providerID));
  }, [dispatch]);

  useEffect(() => {
    if (loginData.providerFound) {
      setEMAIL(loginData.providerFound.email);
    }
  }, [loginData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    // setOpen(false);
    dispatch(logout());
    window.localStorage.clear()
    dispatch(LoginUser({ email: EMAIL, password: '12345678' })).then(
      (user) => {
        toast.success(
          `👍 Bienvenido, Un gran día te espera!`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        history.push('/user/provider');
        window.location.reload(true);
      }
    );
    // history.push('/user/provider');
    // toast.success(`Proceso finalizado, ya puede acceder a su cuenta`, {
    //   position: toast.POSITION.TOP_CENTER
    // })
  };

  return (
    <div>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleClickOpen}
        className={classes.button}
      >
        {nameBoton}
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'🎉 Bienvenid@ 🎉'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Desde ahora tu local es parte del gremio de PetSoft. En tu correo recibiras las notificaciones de los servicios
            que adquieran contigo, además de encontrar todos los detalles es
            esta plataforma😎
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color='primary'>
            Disagree
          </Button> */}
          <Button
            onClick={handleClose}
            color='secondary'
            variant='contained'
            className={classes.button}
          >
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
