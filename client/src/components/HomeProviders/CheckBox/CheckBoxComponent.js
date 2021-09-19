import React from 'react';
import { useDispatch } from 'react-redux';
import { addServicesToProvider } from '../../../Redux/actions/actions';
import { toast } from 'react-toastify';

//IMPORT MNATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//styles
import './CheckBoxComponent.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CheckBoxComponent = ({ data }) => {
  const classes = useStyles();

  const provider = JSON.parse(window.localStorage.getItem('loggedSpatifyApp'));
  const dispatch = useDispatch();

  const [serviceAdd, setServiceAdd] = React.useState({
    services: [],
    provider: provider?.providerFound?._id.toString(),
  });

  const handleChange = (e) => {
    setServiceAdd({
      ...serviceAdd,

      services: [...serviceAdd.services, e.target.value],
    });

    const have = serviceAdd.services.some(
      (service) => service === e.target.value
    );
    if (have) {
      setServiceAdd({
        ...serviceAdd,
        services: [...serviceAdd.services].filter(
          (service) => service !== e.target.value
        ),
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addServicesToProvider(serviceAdd));
    toast.success(`Por favor continue con el siguiente paso`, {
      position: toast.POSITION.TOP_CENTER
    })
  };
  // console.log('NewDataService', serviceAdd);
  return (
    <>
      <form action='' onSubmit={handleSubmit}>
        <div className='select-services'>
          {data ? (
            data.map((service) => (
              <div className='contain-service' key={service.name}>
                <label htmlFor=''>
                  {service.name}
                  <input
                    type='checkBox'
                    onChange={handleChange}
                    value={service.name}
                    className='input-service'
                  />
                </label>
              </div>
            ))
          ) : (
            <h1>loading...</h1>
          )}
          <div className={classes.root}>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleSubmit}
              className='input-submit-service'
            >
              Confirmar
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckBoxComponent;

/*



*/
