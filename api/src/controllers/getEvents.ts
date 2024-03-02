import { RequestHandler } from "express";
import Events from "../models/Events";
import Services from "../models/Services";
import Users from "../models/Users";
import Calendar from "../models/Calendar";
import { isValidDate } from "../utils/functions";
import Providers from "../models/Providers";
import Bags from "../models/Bags";
import Rating from "../models/Rating";
import Pets from "../models/Pets";

export const getCalendarEventsByDay: RequestHandler = async (req, res) => {
  let reservations: any = [];

  if (req.body.user !== "") {
    const user: any = await Users.findById(req.body.user);
    const bag: any = await Bags.findOne({ user: user });
    reservations = bag.reservations;
  }

  Providers.findById(req.body.provider)
    .then((prov: any) => {
      Calendar.findOne({ provider: prov }).then((result: any) => {
        const events: Array<any> = [];

        result.eventsHours.forEach((hour: Number, index: any) => {
          let validate = isValidDate(req.body.date, hour);

          let cartItem = false;

          reservations.forEach((reservation: any) => {
            if (
              reservation.providerID === req.body.provider &&
              reservation.date === req.body.date &&
              reservation.hour === hour
            ) {
              cartItem = true;
            }
          });

          events[index] = {
            isActive: validate,
            isAvailable: true,
            date: req.body.date,
            hour: hour,
            isCartItem: cartItem,
          };
        });

        result.events.map((event: any) => {
          if (event.date === req.body.date) {
            result.eventsHours.forEach((hour: Number, index: any) => {
              if (event.hour === hour) {
                events[index] = event;
              }
            });
          }
        });

        return res.status(200).json(events);
      });
    })

    .catch(() => {
      return res.status(404).json({ message: "No se encontraron Eventos" });
    });
};

export const getEventsByRole: RequestHandler = async (req, res) => {
  const { role, id } = req.params;

  try {
    let user: any;

    if (role === "user") {
      user = await Users.findById(id);
    } else {
      const prov = await Providers.findById(id);
      user = await Calendar.findOne({ provider: prov });
    }

    const events: Array<any> = [];

    for (let i = 0; i < user.events.length; i++) {
      const actual = user.events[i];
      const event = await Events.findById(actual);
      const eventUser = await Users.findById(event.user);
      const eventCalendar = await Calendar.findById(event.calendar);
      const eventProvider = await Providers.findById(eventCalendar.provider);

      if (event.isActive) {
        if (!isValidDate(event.date, event.hour)) {
          event.condition = "finalized";
          event.isActive = false;
          event.ratingAlert = true;
          await event.save();
        }
      }

      const eventData: any = {
        _id: event._id,
        condition: event.condition,
        isActive: event.isActive,
        userAlert: event.userAlert,
        providerAlert: event.providerAlert,
        ratingAlert: event.ratingAlert,
        hour: event.hour,
        date: event.date,
        address: {
          street: event.address.street,
          number: event.address.number,
          city: event.address.city,
          state: event.address.state,
          country: event.address.country,
          zip_code: event.address.zip_code,
        },
        pet: {
          name: event.pet.name,
          animal: event.pet.animal,
          race: event.pet.race,
          age: event.pet.age,
          sex: event.pet.sex,
        },
        service: {
          name: event.service.name,
          price: event.service.price,
          description: event.service.description,
        },
        user: {
          firstName: eventUser?.firstName,
          lastName: eventUser?.lastName,
          gender: eventUser?.gender,
          phone: eventUser?.phone,
        },
        provider: {
          firstName: eventProvider?.firstName,
          lastName: eventProvider?.lastName,
          phone: eventProvider?.phone,
        },
      };
      events.push(eventData);
    }

    res.status(200).json(events);
  } catch (error) {
    res.send(error);
  }
};

export const cancelEvent: RequestHandler = async (req, res) => {
  try {
    const { role } = req.params;
  
    const event = await Events.findById(req.body.event);
    event.isActive = false;
    event.condition = "cancelled";

    if (role === "user") event.providerAlert = true;
    else event.userAlert = true;

    await event.save();
    res.status(200).send(event);
  } catch (error) {
    res.send(error);
  }
};

export const giveReview: RequestHandler = async (req, res) => {
  try {
    const event = await Events.findById(req.body.event);
    const calendar = await Calendar.findById(event.calendar);
    const provider: any = await Providers.findById(calendar.provider);

    const review = new Rating({
      assessment: req.body.assessment,
      comments: req.body.comments,
      provider: calendar.provider,
      user: event.user,
      event: req.body.event,
    });

    provider.rating.push(review);
    await provider.save();

    await review.save();
    event.ratingAlert = false;
    await event.save();

    res.status(200).send(event);
  } catch (error) {
    res.send(error);
  }
};

export const removeAlert: RequestHandler = async (req, res) => {
  try {
    const event = await Events.findById(req.body.event);
    event.userAlert = false;
    event.providerAlert = false;
    await event.save();

    res.status(200).send(event);
  } catch (error) {
    res.send(error);
  }
};
