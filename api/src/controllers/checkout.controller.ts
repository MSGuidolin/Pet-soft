import { RequestHandler } from "express";
import Bags from "../models/Bags";
import Users from "../models/Users";
import { HOST } from '../utils/constants'
const mercadopago = require('mercadopago');

export const checkoutController: RequestHandler = async (req, res) => {

    mercadopago.configure({
        access_token: 'APP_USR-7482377665815565-072019-e7aff909119baf7ff8e9004a562731c5-794335524'
    });
    const user = await Users.findById(req.params.id);
    const bag = await Bags.findOne({ user: user });

    const data = bag.reservations;

    const preferenceData = data.map((reservation: any) => {
        return {
            title: reservation.service,
            unit_price: reservation.price,
            quantity: 1
        }
    })

    let preference = {
        items: preferenceData,
        back_urls: {
            "success": `${HOST}/cart/${req.params.id}`,
            "failure": `${HOST}/cart/${req.params.id}`,
            "pending": `${HOST}/cart/${req.params.id}`
        }
    };

    mercadopago.preferences.create(preference)
        .then((response: any) => {
            res.status(200).send(response)
        }).catch((error: Error) => {
            console.log(error);
        });
};