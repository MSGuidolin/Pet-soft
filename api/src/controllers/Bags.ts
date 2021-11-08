import { RequestHandler } from "express";
import Addresses from "../models/Addresses";
import Bags from "../models/Bags";
import Calendar from "../models/Calendar";
import Events from "../models/Events";
import Pets from "../models/Pets";
import Services from "../models/Services";
import Users from "../models/Users";
import { isValidDate } from '../utils/functions'

export const addReservation: RequestHandler = async (req, res) => {
    try {
        const user = await Users.findById(req.body.user)
        let bag = await Bags.findOne({ user: user })

        let check = false;
        bag.reservations.forEach((r: any) => {
            if (r.provider === req.body.provider &&
                r.date === req.body.date &&
                r.hour === req.body.hour) {
                check = true    
            }
        })
        if (check) return res.status(301).send('this reservation already exists')
        else {
            bag.reservations.push(req.body)
            bag.save()
                .then((saved: any) => {
                    res.status(200).send('reservation added successfully')
                })
        }
    } catch (error) {
        return res.send(error);
    }
};

export const getUserReservations: RequestHandler = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        const bag = await Bags.findOne({ user: user })
        return res.status(200).send(bag.reservations);
    } catch (error) {
        return res.send(error);
    }
};

export const getReservationsAvailability: RequestHandler = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        const bag = await Bags.findOne({ user: user })

        // res.status(200).send(bag.reservations)
        let available: any[] = [];
        let notAvailable: any[] = [];

        for (let i = 0; i < bag.reservations.length; i++) {
            const calendar = await Calendar.findOne({ provider: bag.reservations[i].providerID })
            const eventFound = await Events.findOne({
                $and: [
                    { calendar: calendar },
                    { hour: bag.reservations[i].hour },
                    { date: bag.reservations[i].date }
                ]
            })
            if (eventFound) notAvailable.push(bag.reservations[i])
            else {
                if (!isValidDate(bag.reservations[i].date, bag.reservations[i].hour)) {
                    notAvailable.push(bag.reservations[i])
                } else {
                    available.push(bag.reservations[i])
                }
            }
        }

        if (notAvailable.length) {
            bag.reservations = available;
            await bag.save();
            res.status(200).json({ error: true, notAvailable });
        } else {
            res.status(200).json({ error: false, available })
        }

    } catch (error) {
        return res.send(error);
    }
}

export const payReservations: RequestHandler = async (req, res) => {
    try {
        const user: any = await Users.findById(req.params.id)
        const bag = await Bags.findOne({ user: user })

        for (let i = 0; i < bag.reservations.length; i++) {

            const actual = bag.reservations[i]
            const calendar = await Calendar.findOne({ provider: actual.providerID })

            const address = await Addresses.findOne({
                $and: [
                    { name: actual.address },
                    { user: user }
                ]
            });
            const service = await Services.findOne({ name: actual.service });

            const pet = await Pets.findOne({
                $and: [
                    { name: actual.pet },
                    { user: user }
                ]
            });

            let eventData: any = {
                user: req.params.id,
                calendar: calendar,
                address: address,
                service: service,
                isAvailable: false,
                isActive: true,
                hour: actual.hour,
                date: actual.date,
                pet: pet,
                title: actual.title || 'servicio'
            }
            const event = new Events(eventData);
            await event.save();

            service.events.push(event);
            await service.save();

            user.events.push(event);
            await user.save();

            calendar.events.push(event);
            await calendar.save();
        }
        res.status(200).json('All events added');

    } catch (error) {
        return res.send(error);
    }
}

export const deleteReservation: RequestHandler = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        const bag = await Bags.findOneAndUpdate({ user: user },
            { $pull: { reservations: req.body } })
        await bag.save()
        return res.status(200).send(bag.reservations);
    } catch (error) {
        return res.send(error);
    }
};