import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ProviderProfileData from './ProviderProfileData/ProviderProfileData';
import ProviderProfileUpdate from './ProviderProfileUpdate/ProviderProfileUpdate';
import ProviderProfileBanner from './ProviderProfileBanner/ProviderProfileBanner';
import { useDispatch } from 'react-redux';
import { getProviderDetails } from '../../Redux/actions/actions';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  providerProfile: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  gridItem: {
    width: '70%',
    height: 'auto',
  },
  gridBanner: {
    width: '100%',
    height: 'auto',
    alignSelf: 'flex-start',
  },
  gridProfile: {
    height: 'auto',
    width: 'auto',
  },
  gridForm: {
    height: 'auto',
    width: '80%',
  },
  paper: {
    margin: 'auto 10px',
    padding: 15,
  },
  containerBanner: {
    position: 'relative',
    textAlign: 'center',
    boxShadow: '0px 2px 2px #888888',
    marginBottom: 30,
    borderRadius: 3,
  },
  bannerText: {
    position: 'absolute',
    top: '20%',
    left: 16,
  },
  bannerTextSubt: {
    position: 'absolute',
    top: '40%',
    left: 16,
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
  },
  profileImg: {
    borderRadius: '50%',
    width: 300,
    height: 300,
  },
  bannerImg: {
    width: '100%',
    height: 'auto',
  },
  data: {
    marginTop: 20,
  },
  dataItems: {
    margin: '10px auto',
  },
  dataSubtitle: {
    fontWeight: 'bold',
  },
  dirItems: {
    margin: '5px auto',
  },
  divider: {
    margin: '20px auto',
  },
  buttonContainer: {
    margin: '30px auto 5px auto',
    width: 200,
  },
  select: {
    width: '100%',
  },
}));

function ProviderProfile() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const provider = JSON.parse(
    window.localStorage.getItem('loggedSpatifyApp')
  ).providerFound;

  useEffect(() => {
    dispatch(getProviderDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <div className='container-main'>
        <div className='container'>
          <div className={classes.providerProfile}>
            <Grid item>
              <ProviderProfileData provider={provider} classes={classes} />
            </Grid>
            <Grid
              item
              container
              direction='column'
              justifyContent='flex-start'
              alignItems='center'
              className={classes.gridItem}
            >
              <ProviderProfileBanner provider={provider} classes={classes} />
              <ProviderProfileUpdate classes={classes} provider={provider} />
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProviderProfile;
