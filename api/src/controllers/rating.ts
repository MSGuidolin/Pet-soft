import { RequestHandler } from "express";
import Rating from "../models/Rating";
import Providers from "../models/Providers";

export const getAllRating: RequestHandler = async (req, res) => {
  try {
    const provider = await Providers.findById(req.params.id);
    if (provider) {
      const foundRating = await Rating.find({ provider: provider });
      if (foundRating.length)
        return res.send({
          message: `Éstas son las reseñas de ${provider.firstName}.`,
          data: foundRating,
        });
      return res.status(201).send({
        message: "Sin reseñas por el momento.",
      });
    } else {
      res.status(404).send({
        message: "Proveedor no encontrado.",
      });
    }
  } catch (error: any) {
    res.send(error);
  }
};

export const getOneRating: RequestHandler = async (req, res) => {
  try {
    const { id, idRt } = req.params;
    const provider = await Providers.findById(id);
    if (provider) {
      const foundRating = await Rating.findById({ id: idRt });
      if (foundRating) return res.send(foundRating);
      return res
        .status(404)
        .send({ message: "Reseña de prestador no encontrada" });
    }
  } catch (error) {
    res.send(error);
  }
};
