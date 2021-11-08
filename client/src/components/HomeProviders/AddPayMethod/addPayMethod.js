import React from 'react';
import { useDispatch } from 'react-redux';
//Materia UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
//second import materialUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      //   width: 200,
      width: '25ch',
    },
    '& > *': {
      width: '25ch',
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  add: {
    width: '3rem',
    height: '3rem',
  },
  count: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Banco Nación',
  'Banco Industrial',
  'Banco Santander',
  'BBVA ',
  'Brubank',
  'Banco de Córdoba',
  'Banco BICA',
  'HSBC Bank Argentina',
  'Banco San Juan',
];
const countTypes = [
  'Caja de ahorros',
  'Cuenta corriente',
  'Cuenta sueldo',
  'Cuenta universal gratiuta',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [personName, setPersonName] = React.useState([]);
  const [payData, setPayData] = React.useState({});
  const [textInput, setTextInput] = React.useState('');

  //   const handleChange = (event) => {
  //     setPersonName({
  //       ...personName,
  //       [event.target.name]: event.target.value,
  //     });
  //   };
  const handleChange = (event) => {
    setPersonName([...event.target.value]);
  };

  const handleInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleClick = () => {
    setPersonName([...personName, textInput]);
    const [banco, cuenta, numero = textInput] = personName;
    setPayData({
      banco: banco,
      cuenta: cuenta,
      numero: numero,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // pendiente hacer funcion en las acciones, porque todavia no hay ruta para agregar cuenta de provedor
    dispatch(`hacer la function en actions y pasar la paydata ${payData}`);
  };

  //   console.log(personName);
  console.log(payData);

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-name-label'>Banco</InputLabel>
          <Select
            labelId='demo-mutiple-name-label'
            id='demo-mutiple-name'
            multiple
            value={personName}
            onChange={handleChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-checkbox-label'>
            Tipo de cuenta
          </InputLabel>
          <Select
            labelId='demo-mutiple-checkbox-label'
            id='demo-mutiple-checkbox'
            multiple
            value={personName}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {countTypes.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <div className={classes.count}>
            <TextField
              required
              id='filled-required'
              label={`N° de cuenta (Required)`}
              variant='filled'
              onChange={handleInput}
              // onChange={handleInput}
            >
              <Button color='secondary' onClick={handleClick}>
                Agregar cuenta
              </Button>
            </TextField>

            <IconButton
              onClick={handleClick}
              color='primary'
              className={classes.add}
            >
              <AddIcon />
            </IconButton>
          </div>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-chip-label'>Seleccionado</InputLabel>
          <Select
            labelId='demo-mutiple-chip-label'
            id='demo-mutiple-chip'
            multiple
            value={personName}
            onChange={handleChange}
            input={<Input id='select-multiple-chip' />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </div>
  );
}
