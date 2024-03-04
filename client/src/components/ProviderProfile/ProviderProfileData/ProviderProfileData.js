import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProvidersAddresses } from '../../../Redux/actions/actions';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Divider,
  Avatar,
  IconButton,
} from '@material-ui/core';
import FormAddresses from '../../HomeProviders/FormAddresses/FormAddress';
import image_profileII from '../../../img/image_profileII.jpg';

function ProviderProfileData({ provider, classes, data }) {

  console.log(provider)
  return (
    <Grid item className={classes.gridProfile}>
      <Paper className={classes.paper} elevation={3}>
        <Box className={classes.image}>
          <img
            className={classes.profileImg}
            src={"https://cdn.dribbble.com/users/5180766/screenshots/15347456/petshop_4x.jpg"}
            // src={image_profileII}
          />
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.data}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            direction='column'
          >
            <Grid item>
              <Typography variant='h5'>
                {provider?.firstName + ' ' + provider?.lastName}
              </Typography>
            </Grid>
            <Grid item className={classes.dataItems}>
              <Avatar className={classes.icon}>
                <IconButton>
                  <FormAddresses type='profile' data={provider} />
                </IconButton>
              </Avatar>
            </Grid>

            <Grid item container direction='row' className={classes.dataItems}>
              <Typography variant='body1' className={classes.dataSubtitle}>
                Datos personales{' '}
              </Typography>
            </Grid>

            <Divider variant='inset' />

            <Grid
              item
              container
              justifyContent='space-between'
              direction='column'
            >
              <Grid
                item
                container
                justifyContent='space-between'
                className={classes.dataItems}
              >
                <Typography variant='h7'>Email</Typography>
                <Typography variant='h7'>{provider?.email}</Typography>
              </Grid>
              <Grid
                item
                container
                justifyContent='space-between'
                className={classes.dataItems}
              >
                <Typography variant='h7'>Teléfono</Typography>
                <Typography variant='h7'>{provider?.phone}</Typography>
              </Grid>

              <Grid
                item
                container
                direction='row'
                className={classes.dataItems}
              >
                <Typography variant='body1' className={classes.dataSubtitle}>
                  Direcciones{' '}
                </Typography>
              </Grid>
              <Grid
                item
                container
                justifyContent='space-between'
                direction='column'
              >
                {Array.isArray(data) && data.length > 0 ? (
                  data.filter((address) => address.is_main === true)
                    .map((a) => {
                      return (
                        <>
                          <Grid
                            item
                            container
                            justifyContent='space-between'
                            className={classes.dirItems}
                          >
                            <Typography variant='h7'>Dirección</Typography>
                            <Typography variant='h7'>{a.direction}</Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            justifyContent='space-between'
                            className={classes.dirItems}
                          >
                            <Typography variant='h7'>Detalles</Typography>
                            {a.address_details ? (
                              <Typography variant='h7'>
                                {a.address_details}
                              </Typography>
                            ) : (
                              <Typography variant='subtitle1'>
                                No definido
                              </Typography>
                            )}
                          </Grid>
                          <Grid
                            item
                            container
                            justifyContent='space-between'
                            className={classes.dirItems}
                          >
                            <Typography variant='h7'>Ciudad</Typography>
                            <Typography variant='h7'>{a.city}</Typography>
                          </Grid>
                        </>
                      );
                    })
                ) : (
                  <p>Completa el formulario...</p>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
}

export default ProviderProfileData;
