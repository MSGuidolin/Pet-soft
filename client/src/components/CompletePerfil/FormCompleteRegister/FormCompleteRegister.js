import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useInput } from '../../../hooks/customHooks';
import { UserContext } from '../../../index';
import { log, success, error } from '../../../utils/logs';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import Link from '@material-ui/core/Link'; */
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { deleteUser, LoginUser } from '../../../Redux/actions/user.actions';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
  },
  containersSelect: {
    marginTop: '2.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'spaceBetween',
  },
}));

const FormCompleteRegister = ({ id, userGoogle }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const phone = useInput('phone');
  const gender = useInput('gender');
  const roles = useInput('roles');

  const [valid, setValid] = useState(true);
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    genderError: '',
    rolesError: '',
  });

  useEffect(() => {
    setValid(true);
    setError({
      phoneError: '',
      genderError: '',
      rolesError: '',
    });
  }, [phone.value, gender.value, roles.value]);

  const validatePhone = () => {
    let isValid = true;
    if (!phone.value) {
      setValid(false);
      isValid = false;
      setError({ ...error, phoneError: 'Por favor ingrese telefono' });
    }

    if (phone.value.length < 10) {
      setValid(false);
      isValid = false;
      setError({
        ...error,
        phoneError: 'La telefono debe tener 10 digitos ',
      });
    }
    return isValid;
  };

  const validateGender = () => {
    let isValid = true;
    if (!gender.value) {
      setValid(false);
      isValid = false;
      setError({ ...error, genderError: 'Por favor seleccione un genero' });
    }
    return isValid;
  };

  const validateRol = () => {
    let isValid = true;
    if (!roles.value) {
      setValid(false);
      isValid = false;
      setError({ ...error, rolesError: 'Por favor seleccione un rol' });
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // posteo de user
    if (validatePhone() && validateGender() && validateRol()) {
      if (roles.value === '610444bb9891fb264c43f87f') {
        axios
          .put(`http://localhost:3002/users/${id}`, {
            phone: phone.value,
            gender: gender.value,
            roles: roles.value,
          })
          .then((response) => {
            dispatch(
              LoginUser({
                email: userGoogle.email,
                password: userGoogle.email,
              })
            ).then((user) => {
              toast.success(
                `👍 Bienvenido ${userGoogle.firstName}. Un gran día te espera!`,
                {
                  position: toast.POSITION.TOP_CENTER,
                }
              );
              history.push('/');
              window.location.reload(true);
            });
          });
      }
      if (roles.value === '610444bb9891fb264c43f880') {
        //provider

        axios
          .post('http://localhost:3002/auth/signup', {
            ...userGoogle,
            phone: phone.value,
            gender: gender.value,
            roles: 'provider',
          })
          .then((response) => {
            dispatch(deleteUser(id));
            dispatch(
              LoginUser({
                email: userGoogle.email,
                password: userGoogle.password,
              })
            ).then((user) => {
              toast.success(
                `👍 Bienvenido ${userGoogle.firstName}. Un gran día te espera!`,
                {
                  position: toast.POSITION.TOP_CENTER,
                }
              );
              history.push('/user/provider');
              window.location.reload(true);
            });
            // setUser(response.data);
          })
          .catch((error) => {
            // console.log(error);
            if (error.response?.status !== 404 || 422)
              toast.error(
                `Lo sentimos. Este email ya tiene una cuenta vinculada.`,
                {
                  position: toast.POSITION.TOP_CENTER,
                }
              );
          });
      }
    }
  };
  console.log('USER_GOOGLE_FORM', userGoogle);
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'></Typography>
        <form
          className={classes.form}
          noValidate
          id='form'
          onSubmit={(e) => handleSubmit(e)}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='phone'
                label='Telefono'
                type='number'
                id='phone'
                autoComplete='phone'
                inputProps={{ maxLength: 10 }}
                error={!valid}
                helperText={!valid ? error.phoneError : ''}
                {...phone}
              />
            </Grid>
            <div style={{ color: 'blue' }}>*Ingresar teléfono sin 0 ni 15</div>
            <br />
            <br />
            <div className={classes.containersSelect}>
              <Grid item xs={12}>
                <InputLabel id='demo-simple-select-label'>Género</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={'Unkwown'}
                  error={!valid}
                  helperText={!valid ? error.genderError : ''}
                  {...gender}
                >
                  <MenuItem value={'Male'}>Hombre</MenuItem>
                  <MenuItem value={'Female'}>Mujer </MenuItem>
                  <MenuItem value={'Unkwown'}>Prefiero no decirlo</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <InputLabel id='demo-simple-select-label'>Soy</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={'user'}
                  error={!valid}
                  helperText={!valid ? error.rolesError : ''}
                  {...roles}
                >
                  <MenuItem value={'610444bb9891fb264c43f87f'}>
                    Usuario
                  </MenuItem>
                  <MenuItem value={'610444bb9891fb264c43f880'}>
                    Proveedor{' '}
                  </MenuItem>
                  {/* <MenuItem value={"60f8b6d9d525721260545f82"}>admin</MenuItem> */}
                </Select>
              </Grid>
            </div>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Terminar
          </Button>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
};

export default FormCompleteRegister;
