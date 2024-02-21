import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//IMPORT MATERIAL UI
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import {
  addHoursJobToProvider,
  getEventsHoursProvider,
  updateEventsHoursProvider,
} from '../../../Redux/actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import './SelectorHour.scss';
import { add } from 'date-fns/esm';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  hours: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

export default function MaterialUIPickers({ type }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const initialState = new Date();
  const [selectedDate, setSelectedDate] = useState(initialState.getHours());

  const provider = JSON.parse(window.localStorage.getItem('loggedPetSoftApp'));
  const [addHours, setAddHours] = useState({
    eventsHours: [],
    provider: provider.providerFound?._id,
  });

  const handleDateChange = (date) => {
    setSelectedDate(date.getHours());

    setAddHours({
      ...addHours,
      eventsHours: [...addHours.eventsHours, Number(date.getHours())],
    });

    const have = addHours.eventsHours.some(
      (hour) => hour === Number(date.getHours())
    );
    //for no repeat hour
    if (have) {
      setAddHours({
        ...addHours,
        eventsHours: [...addHours.eventsHours],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'Horarios') {
      dispatch(updateEventsHoursProvider(provider.providerFound._id, addHours));
      toast.success(`Actualizaste correctamente tus horarios de trabajo 😎`, {
        position: toast.POSITION.TOP_CENTER
      })
    } else {
      dispatch(addHoursJobToProvider(addHours));
      toast.success(`Por favor haz click en siguiente`, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  };

  //remove hour not desire
  const handleCLick = () => {
    setAddHours({
      ...addHours,
      eventsHours: [],
    });
  };

  return (
    <form action='' onSubmit={handleSubmit}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent='space-around'>
          <KeyboardTimePicker
            margin='normal'
            id='time-picker'
            label='Selecciona la hora'
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <div className={classes.root}>
        {addHours.eventsHours.length > 0 &&
          addHours.eventsHours.map((hour, i) => (
            <div className={classes.hours}>
              <AccessTimeIcon aria-label='time' />
              <p name='t' id={i} value={Number(hour)}>{`${hour}:00 hrs`}</p>
            </div>
          ))}
        <br />
        <IconButton onClick={handleCLick}>
          <DeleteForeverIcon />
        </IconButton>
        <Button variant='contained' color='secondary' onClick={handleSubmit}>
          Confirmar
        </Button>
      </div>
    </form>
  );
}
