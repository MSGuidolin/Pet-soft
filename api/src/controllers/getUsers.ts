import { RequestHandler } from 'express';
import Users from '../models/Users';
import path from 'path';
import fs from 'fs-extra';
import Providers from '../models/Providers';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await Users.find();
    return res.json(users);
  } catch (error) {
    res.json(error);
  }
};

export const getUser: RequestHandler = async (req, res) => {
  // para traer un solo usuario
  try {
    const userFound = await Users.findById(req.params.id);
    if (!userFound) {
      const provider = await Providers.findById(req.params.id);
      if (provider) return res.json(provider);
      else
        return res
          .json(404)
          .json({ message: 'No encontramos el usuario solicitado' });
    }
    return res.json(userFound);
  } catch (error) {
    res.json(error);
  }
};

export const getUserGoogle: RequestHandler = async (req, res) => {
  // para traer un solo usuario
  try {
    const userFound = await Users.findOne({ googleId: req.params.id });
    if (!userFound)
      return res
        .json(404)
        .json({ message: 'No encontramos el usuario solicitado' });
    return res.json(userFound);
  } catch (error) {
    res.json(error);
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const userUpdate: any = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!userUpdate) {
      return res
        .status(404)
        .json({ message: 'No encontramos el usuario solicitado' });
    }
    return res.status(201).json(userUpdate);
  } catch (error) {
    res.status(500).json({ message: 'Ha habido un problema con tu pedido' });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    if (/^(?:[1-9]\d*|\d)$/.test(req.params.id)) {
      const userDel = await Users.findOneAndDelete({ googleId: req.params.id });
      if (!userDel)
        return res
          .status(404)
          .json({ message: 'No encontramos el usuario solicitado' });
      else {
        // await fs.unlink(path.resolve(userDel.image));
        return res.json({
          message: 'Usuario eliminado con éxito.',
          userDel,
        });
      }
    }
    const userDelete = await Users.findByIdAndDelete(req.params.id);
    if (!userDelete)
      return res
        .status(404)
        .json({ message: 'No encontramos el usuario solicitado' });
    else {
      await fs.unlink(path.resolve(userDelete.image));
      return res.json({
        message: 'Usuario eliminado con éxito.',
        userDelete,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ha habido un problema con tu pedido' });
  }
};

// export const assignService: RequestHandler = async (req, res) => {
//   const userWithService = await Users.findByIdAndUpdate(
//     req.params.id,
//     { $push: { services: req.body } },
//     {
//       new: true,
//     }
//   );
//   return res.json(userWithService);
// };

// export const removeService: RequestHandler = async (req, res) => {
//   const userWithService = await Users.findByIdAndUpdate(
//     req.params.id,
//     { $pull: { services: req.body } },
//     {
//       new: true,
//     }
//   );
//   return res.json(userWithService);
// };
