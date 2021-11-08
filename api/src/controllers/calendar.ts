import { RequestHandler } from 'express';
import Calendar from '../models/Calendar';
import Providers from '../models/Providers';

export const CreateCalendar: RequestHandler = (req, res) => {
  Providers.findById(req.body.provider)
    .then((provider: any) => {
      if (!provider.hasCalendar) {
        provider.hasCalendar = true;
        provider.save();
        const newCalendar = new Calendar(req.body);
        newCalendar.save().then((calendar: any) => {
          res.status(200).send(calendar);
        });
      } else {
        return res
          .status(301)
          .json({ message: 'Ya existe un calendario para ese proveedor' });
      }
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export const getHoursByProvider: RequestHandler = async (req, res) => {
  try {
    const calendarProvider = await Calendar.findOne({
      provider: req.params.id,
    });
    return res.send(calendarProvider);
  } catch (error) {
    res.status(404).json({
      message: 'No se encontraron horarios para el proveedor',
      error: error,
    });
  }
};

export const updateEventsHoursProvider: RequestHandler = async (req, res) => {
  try {
    const eventsHoursUpdate = await Calendar.findOneAndUpdate(
      { provider: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!eventsHoursUpdate) return res.status(202).send();
    return res.json(eventsHoursUpdate);
  } catch (error) {
    res.status(404).json(error);
  }
};
