import React from 'react';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Avatar,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormAddresses from '../FormAddresses/FormAddress';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MaterialUIPickers from '../SelectHour/SelectorHour';

function ServicesProvider({ provider, classes, data, alldata, type }) {
  return (
    <Grid item className={classes.gridProfile}>
      <Paper className={classes.paper} elevation={3}>
        <Box className={classes.data}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            direction='column'
          >
            <Grid
              item
              container
              justifyContent='space-between'
              direction='column'
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6'>
                    {type === 'Servicios' ? 'Servicios 💇‍♂️💅' : 'Horarios 🕚'}
                  </Typography>
                </AccordionSummary>
                <hr />
                {data?.map((service) => (
                  <AccordionDetails key={service.name}>
                    <>
                      {service.name ? (
                        <>
                          <ArrowRightIcon color='secondary' />
                          {service.name}
                        </>
                      ) : (
                        <>
                          <AccessTimeIcon color='secondary' /> {service}:00 hrs`
                        </>
                      )}
                    </>
                  </AccordionDetails>
                ))}
                {type === 'Horarios' ? (
                  <MaterialUIPickers type='Horarios' />
                ) : (
                  <AccordionActions>
                    <Avatar>
                      <IconButton className={classes.icon}>
                        <FormAddresses type='service' alldata={alldata} />
                      </IconButton>
                    </Avatar>
                  </AccordionActions>
                )}
              </Accordion>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
}

export default ServicesProvider;
