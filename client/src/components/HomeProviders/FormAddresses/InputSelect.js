import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 540,
  },
}));

export default function InputSelect({ data }) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [openType, setOpenType] = React.useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    data.name = e.target.value;
  };

  const handleCloseType = () => {
    setOpenType(false);
  };

  const handleOpenType = () => {
    setOpenType(true);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-controlled-open-select-label'>
          Tipo de dirección
        </InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={openType}
          onClose={handleCloseType}
          onOpen={handleOpenType}
          value={name}
          onChange={handleName}
        >
          <MenuItem value='Principal'>Sede Principal</MenuItem>
          <MenuItem value='Auxiliar'>Sede Auxiliar</MenuItem>
          <MenuItem value='Otra'>Otra</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
