import { RequestHandler } from "express";
import CreditCards from "../models/CreditCards";
import Users from "../models/Users";

export const getAllCreditCards: RequestHandler = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      const cc = await CreditCards.find({ user: user });
      return res.send(cc);
    }
    return res.status(404).send({
      message: "El usuario no registra ninguna tarjeta al momento.",
    });
  } catch (error: any) {
    res.send(error);
  }
};
export const getOneCreditCard: RequestHandler = async (req, res) => {
  try {
    const { id, idCC } = req.params;
    const user = await Users.findById(id);
    if (user) {
      const foundCC = await CreditCards.findById({ id: idCC });
      if (foundCC) return res.send(foundCC);
      return res
        .status(404)
        .send({ message: "Tarjeta de crédito no encontrada" });
    }
  } catch (error: any) {
    res.send(error);
  }
};
export const createCreditCard: RequestHandler = async (req, res) => {
  try {
    const user = await Users.findById(req.body.user);
    if (user) {
      const foundCC = await CreditCards.findOne({
        card_number: req.body.card_number,
      });
      if (foundCC)
        return res.status(300).send({
          message: `Ya tienes una tarjeta de crédito nro ${req.body.card_number.slice(
            -4
          )}. Quieres registrar una nueva?`,
        });
      const newCC = new CreditCards(req.body);
      newCC.save();
      user.creditCards.push(newCC);
      user.save();
      return res.status(201).send({
        data: newCC,
        message: `Nueva tarjeta de crédito ${
          newCC.type_of_card
        } - ${newCC.card_number.slice(-4)} registrada con éxito.`,
      });
    }
  } catch (error: any) {
    res.status(500).send({ message: "Ha habido un problema con tu pedido." });
  }
};
export const updateCreditCard: RequestHandler = async (req, res) => {
  try {
    const { id, idCC } = req.params;
    const user = await Users.findById(id);
    if (user) {
      const updateCC = await CreditCards.findByIdAndUpdate(idCC, req.body, {
        new: true,
      });
      if (!updateCC)
        return res
          .status(404)
          .send({ message: "No encontramos el usuario solicitado" });
      return res.status(201).send({
        data: updateCC,
        message: "Tarjeta de crédito actualizada con éxito.",
      });
    }
  } catch (error: any) {
    res.status(500).send({ message: "Ha habido un problema con tu pedido" });
  }
};
export const deleteCreditCard: RequestHandler = async (req, res) => {
  try {
    const { id, idCC } = req.params;
    const user = await Users.findById(id);
    if (user) {
      const deleteCC = await CreditCards.findByIdAndDelete(idCC);
      if (!deleteCC)
        return res
          .status(404)
          .send({ message: "No encontramos el usuario solicitado" });
      return res.send({
        data: deleteCC,
        message: "Tarjeta de crédito eliminada con éxito.",
      });
    }
  } catch (error: any) {
    res.status(500).send({ message: "Ha habido un problema con tu pedido" });
  }
};
