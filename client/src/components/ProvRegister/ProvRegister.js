import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useInput } from "../../hooks/customHooks";
import { UserContext } from "../../index";
import { log, success, error } from "../../utils/logs";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* import Link from '@material-ui/core/Link'; */
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { InputLabel } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
                Pet-soft{" "}
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'theme.palette.secondary.main',
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { setUser } = useContext(UserContext);
    const history = useHistory();
    const email = useInput("email");
    const password = useInput("password");
    const firstName = useInput("firstName");
    const lastName = useInput("lastName");
    const phone = useInput("phone");
    //   const gender = useInput("gender");
    const gender = { "value": "Male" };
    // const roles = useInput("roles");
    const roles = { "value": "provider" };
    const passwordCheck = useInput("passwordCheck");

    const [valid, setValid] = useState(true);
    const [error, setError] = useState({
        emailError: "",
        passwordError: "",
        firstNameError: "",
        lastNameError: "",
        phoneError: "",
        genderError: "",
        rolesError: "",
    });

    const validateName = () => {
        ///VALIDATE///
        let isValid = true;

        if (!firstName.value) {
            console.log(firstName.value);
            setValid(false);
            isValid = false;
            setError({ ...error, firstNameError: "Por favor ingrese su nombre" });
        } else if (/\d/.test(firstName.value)) {
            setValid(false);
            isValid = false;
            setError({
                ...error,
                firstNameError: "El nombre no puede contener números",
            });
        }

        if (!lastName.value) {
            setValid(false);
            isValid = false;
            setError({ ...error, lastNameError: "Por favor ingrese su apellido" });
        } else if (/\d/.test(lastName.value)) {
            setValid(false);
            isValid = false;
            setError({
                ...error,
                lastNameError: "El apellido no puede contener números",
            });
        }
        return isValid;
    };

    const validatePassword = () => {
        let isValid = true;
        if (!password.value) {
            console.log("entro aca");
            setValid(false);
            isValid = false;
            setError({ ...error, passwordError: "Por favor ingrese su password" });
        }

        if (password.value.length < 8) {
            console.log(password.value.length);
            setValid(false);
            isValid = false;
            setError({
                ...error,
                passwordError: "La contraseña debe tener al menos 8 caracteres",
            });
        }
        if (password.value !== passwordCheck.value) {
            console.log(passwordCheck.value);
            setValid(false);
            isValid = false;
            setError({
                ...error,
                passwordError: "La contraseña no coincide",
            });
        }
        return isValid;
    };

    const validatePhone = () => {
        let isValid = true;
        if (!phone.value) {
            setValid(false);
            isValid = false;
            setError({ ...error, phoneError: "Por favor ingrese su teléfono" });
        }

        if (phone.value.length < 10) {
            setValid(false);
            isValid = false;
            setError({
                ...error,
                phoneError: "La teléfono debe tener 10 dígitos para Bs.As. y CABA",
            });
        }
        return isValid;
    };

    const validateEmail = () => {
        let isValid = true;
        if (!email.value) {
            setValid(false);
            isValid = false;
            setError({ ...error, emailError: "Por favor ingrese su email" });
        }

        if (typeof email.value !== "undefined") {
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(email.value)) {
                setValid(false);
                isValid = false;
                setError({ ...error, emailError: "Ingrese un email válido" });
            }
        }
        return isValid;
    };

    const validateGender = () => {
        let isValid = true;
        if (!gender.value) {
            setValid(false);
            isValid = false;
            setError({ ...error, genderError: "Por favor seleccione su género" });
        }
        return isValid;
    };

    const validateRol = () => {
        let isValid = true;
        if (!roles.value) {
            setValid(false);
            isValid = false;
            setError({
                ...error,
                rolesError: "Por favor seleccione si es usuario final o prestador",
            });
        }
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // posteo de user
        if (
            validateName() &&
            validatePassword() &&
            validatePhone() &&
            validateEmail() &&
            validateGender() &&
            validateRol()
        ) {
            /* const { data } =  */
            axios
                .post("http://localhost:3002/auth/signup", {
                    email: email.value,
                    password: password.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    phone: phone.value,
                    gender: gender.value,
                    roles: roles.value,
                })
                .then((a) => {
                    setUser(a.data);
                    success(`register user ${a.data.email}`);
                    history.push("/");
                    toast.success(`🎉 Felicidades ,cuenta creada con exito`, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    toast.warning(`🙌🏽 Debes verificar tu email antes de ingresar`, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response?.status !== 404 || 422)
                        toast.error(
                            `Lo sentimos. Este email ya tiene una cuenta vinculada`,
                            {
                                position: toast.POSITION.TOP_CENTER,
                            }
                        );
                });
        }
    };

    useEffect(() => {
        setValid(true);
        setError({
            emailError: "",
            passwordError: "",
            firstNameError: "",
            lastNameError: "",
            phoneError: "",
            genderError: "",
            rolesError: "",
        });
    }, [
        firstName.value,
        lastName.value,
        email.value,
        password.value,
        passwordCheck.value,
        phone.value,
        gender.value,
        roles.value,
    ]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar
                    style={{ backgroundColor: "#006064" }}
                    className={classes.avatar}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5"></Typography>
                <form
                    className={classes.form}
                    noValidate
                    id="form"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                                id="firstName"
                                label="Tipo de local"
                                error={!valid}
                                helperText={!valid ? error.firstNameError : ""}
                                {...firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Nombre de local"
                                name="lastName"
                                autoComplete="lastname"
                                error={!valid}
                                helperText={!valid ? error.lastNameError : ""}
                                {...lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                error={!valid}
                                helperText={!valid ? error.emailError : ""}
                                {...email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={!valid}
                                helperText={!valid ? error.passwordError : ""}
                                {...password}
                            />
                        </Grid>
                        <div style={{ color: "blue" }}>
                            *La contraseña debe tener al menos 8 caracteres
                        </div>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordCheck"
                                label="Confirme constraseña"
                                type="password"
                                id="passwordCheck"
                                autoComplete="current-password"
                                {...passwordCheck}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phone"
                                label="Telefono"
                                type="number"
                                id="phone"
                                autoComplete="phone"
                                inputProps={{ maxLength: 10 }}
                                error={!valid}
                                helperText={!valid ? error.phoneError : ""}
                                {...phone}
                            />
                        </Grid>
                        <div style={{ color: "blue" }}>*Ingresar teléfono sin 0 ni 15</div>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "#006064" }}
                        className={classes.submit}
                    >
                        Registrarme
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={"/login"} variant="body2">
                                Ya tienes cuenta? Ingresar
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}