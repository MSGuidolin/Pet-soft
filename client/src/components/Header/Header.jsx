import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import loto from '../../img/loto.png';
import { BiShoppingBag } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import { logout } from '../../Redux/actions/user.actions';
import './Header.scss';
import { UserContext } from '../../index';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    font: 16,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const setStateSearch = useSelector((state) => state.setStateSearch);
  const loginData = useSelector((state) => state.loginData);
  const userActive = useSelector((state) => state.userActive);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [render, setRender] = React.useState('');
  const [ID, setID] = useState('');
  const [username, setUsername] = useState(null);
  // const [user, setUser] = useState("");
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('loggedPetSoftApp')) {
      const storageData = JSON.parse(localStorage.getItem('loggedPetSoftApp'));
      console.log(storageData)
      if (storageData.userFound) {
        if (storageData.userFound.roles[0]?.name == 'user') {
          setUser('user');
          setID(storageData.userFound._id);
          setUsername(storageData.userFound?.firstName);
        } else {
          setUser('provider');
          setID(storageData.providerFound?._id);
          setUsername(storageData.providerFound?.firstName);
        }
      }
    }
  }, [user]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPetSoftApp');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      user.userFound
        ? setRender(user.userFound?.firstName)
        : setRender(user.providerFound?.firstName);
      //(() => dispatch(userActiveSession()))();
    }
    if (userActive !== '') setRender(userActive);
  }, [userActive]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (e) => {
    if (user === 'user') {
      history.push(`/profile/${ID}`);
    } else if (user === 'provider') {
      history.push(`/providers/${ID}/profile`);
    }
    setAnchorEl(null);
  };

  const handleCloseLogin = () => {
    dispatch(logout());

    setRender('');
    setUser('');
    history.push('/');

    handleClose();
    setAnchorEl(null);
  };

  const loginAndRegister = [
    <Link
      to={'/login'}
      style={{ color: '#00695c', textDecoration: 'none' }}
    >
      <Button style={{ fontSize: '16px', fontWeight: 'bold' }} color='inherit'>
        INGRESAR
      </Button>
    </Link>,
    '|',
    <Link
      to={'/userRegister'}
      style={{
        color: '#00695c',
        textDecoration: 'none',
        font: '16px',
      }}
    >
      <Button style={{ fontSize: '16px', fontWeight: 'bold' }} color='inherit'>
        REGISTRARSE{' '}
      </Button>
    </Link>,
    <Link
    to={'/provRegister'}
    style={{
      color: '#311b92',
      textDecoration: 'none',
      font: '16px',
    }}
  >
    <Button style={{ fontSize: '16px', fontWeight: 'bold' }} color='inherit'>
      REGISTRAR VETERINARIA{' '}
    </Button>
  </Link>,
  ];

  let loggedProvider = [
    <Avatar
      onClick={handleClick}
      alt={username ? !username : 'User'}
      src='/static/images/avatar/1.jpg'
    >
      {render && render[0]}
    </Avatar>,
    <Menu
      id='fade-menu'
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      {/*   </Link> */}
      <Link
        to={'/user/provider'}
        style={{ color: 'rgb(121, 47, 111)', textDecoration: 'none' }}
      >
      <MenuItem /* onClick={handleClose} */ onClick={(e) => handleRedirect(e)}>
        Perfil
      </MenuItem>
      </Link>
      <MenuItem onClick={handleClose}>Mis Servicios</MenuItem>
      <MenuItem onClick={handleCloseLogin}>Cerrar Sesión</MenuItem>
    </Menu>,
  ];

  let loggedClient =
    user === 'user'
      ? [
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            onClick={handleClick}
            alt={username ? !username : 'User'}
            src='/static/images/avatar/1.jpg'
          />
          ,
          <Menu
            id='fade-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <Link
              to={`/profile`}
              style={{ color: 'rgb(121, 47, 111)', textDecoration: 'none' }}
            >            
            <MenuItem onClick={(e) => handleRedirect(e)}>Perfil</MenuItem>
            </Link>
            <Link
              to={`/pets`}
              style={{ color: 'rgb(121, 47, 111)', textDecoration: 'none' }}
            >
              <MenuItem onClick={handleClose}>Mis Mascotas</MenuItem>
            </Link>
            <Link
              to={'/profile/historial'}
              style={{ color: 'rgb(121, 47, 111)', textDecoration: 'none' }}
            >
              <MenuItem onClick={handleClose}>Historial De Compras</MenuItem>
            </Link>
            <MenuItem onClick={handleCloseLogin}>Cerrar Sesión</MenuItem>
          </Menu>
          ,
          <Link
            to={'/cart'}
            style={{
              color: 'rgb(121, 47, 111)',
              textDecoration: 'none',
              borderRadius: 50,
              marginLeft: '1rem',
            }}
          >
            <Button color='inherit'>
              <BiShoppingBag />
            </Button>
          </Link>
          ,
        </div>,
      ]
      : loggedProvider;

  return (
    <div className={`${classes.grow} header`}>
      <AppBar position='static' style={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <img
                src={loto}
                alt='logo not found'
                style={{
                  width: '4rem',
                  height: '4rem ',
                  marginBottom: '-5px',
                  marginTop: '2px'
                }}
              />
            </Link>
          </Typography>

          {/* <Link
            to={'/search'}
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: '#00695c',
            }}
          >
            <div style={{ marginLeft: '4rem' }}>Filtrar búsqueda</div>
          </Link> */}

          <Link
            to={'/about-PetSoft'}
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: '#00695c',
            }}
          >
            <div style={{ marginLeft: '4rem' }}>Sobre PetSoft</div>
          </Link>

          <Link
            to={'/about-Us'}
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: '#00695c',
            }}
          >
            <div style={{ marginLeft: '4rem' }}>Sobre nosotros</div>
          </Link>

          {/* <Link
            to={'/covid'}
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: '#00695c',
            }}
          >
            <div style={{ marginLeft: '4rem' }}>Protocolo COVID-19</div>
          </Link> */}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}></div>
          <div style={{ display: 'flex', marginRight: '2rem' }}></div>

          <b>{render === '' ? loginAndRegister : loggedClient}</b>

        </Toolbar>
      </AppBar>
    </div>
  );
}
