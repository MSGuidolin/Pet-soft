import { RequestHandler } from "express";
import Addresses from "../models/Addresses";
import Providers from "../models/Providers";
import Users from "../models/Users";

export const getAllAddresses: RequestHandler = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const provider = await Providers.findById(req.params.id);
    if (user) {
      const foundAddress = await Addresses.find({ user: user });
      if (foundAddress) return res.send(foundAddress);
      return res.status(404).send({
        message: "El usuario no registra ningún domicilio al momento.",
      });
    } else if (provider) {
      const foundAddress = await Addresses.find({ provider: provider });
      if (foundAddress) return res.send(foundAddress);
      return res.status(404).send({
        message: "El prestador no registra ningún domicilio al momento.",
      });
    }
  } catch (error: any) {
    res.send(error);
  }
};

export const getOneAddress: RequestHandler = async (req, res) => {
  try {
    const { id, idAd } = req.params;
    const user = await Users.findById(id);
    const provider = await Providers.findById(id);
    if (user) {
      const foundAddress = await Addresses.findById({ id: idAd });
      if (foundAddress) return res.send(foundAddress);
      return res
        .status(404)
        .send({ message: "Domicilio de usuario no encontrado" });
    } else if (provider) {
      const foundAddress = await Addresses.findById({ id: idAd });
      if (foundAddress) return res.send(foundAddress);
      return res
        .status(404)
        .send({ message: "Domicilio de prestador no encontrado" });
    }
  } catch (error: any) {
    res.send(error);
  }
};

export const createAddress: RequestHandler = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const provider = await Providers.findById(req.params.id);
    let check = false;
    if (user) {
      user.addresses.forEach((address: any) => {
        if (address.name === req.body.name) check = true;
      });
      if (check) {
        return res.status(300).send({
          message: `Ya tienes una domicilio llamado ${req.body.name}. Quieres agregar tu nuevo domicilio con otro nombre o registrar uno nuevo?`,
        });
      } else {
        if (req.body.is_main) {
          user.addresses.forEach(async (ad: any) => {
            ad.is_main = false,
              await ad.save()
          })
        }
        const newAddress = new Addresses({
          ...req.body,
          user: user
        });
        await newAddress.save();
        user.addresses.push(newAddress);
        await user.save();
        return res.status(201).send({
          data: newAddress,
          message: `Nuevo domicilio guardado con éxito.`,
        });
      }
    } else if (provider) {
      let check = false;
      provider?.addresses.forEach((address: any) => {
        if (address.name === req.body.name) check = true;
      });
      if (check) {
        return res.status(300).send({
          message: `Ya tienes una domicilio llamado ${req.body.name}. Quieres agregar tu nuevo domicilio con otro nombre o registrar uno nuevo?`,
        });
      } else {
        const newAddress = new Addresses({
          ...req.body,
          provider: provider.id,
        });
        newAddress.save();
        provider?.addresses.push(newAddress);
        provider?.save();
        return res.status(201).send({
          data: newAddress,
          message: `Nuevo domicilio guardado con éxito.`,
        });
      }
    }
  } catch (error: any) {
    res.status(500).send({
      message: "Ha habido un problema con tu pedido.",
    });
  }
};

export const updateAddress: RequestHandler = async (req, res) => {
  try {
    const { id, idAd } = req.params;
    if (req.body.is_main) {
      let user: any = await Users.findById(id);
      if (!user) {
        user = await Providers.findById(id);
      }
      user.addresses.forEach(async (ad: any) => {
        ad.is_main = false,
          await ad.save()
      })
    }
    const updateAddress = await Addresses.findByIdAndUpdate(idAd, req.body, {
      new: true,
    });
    if (updateAddress)
      return res.status(201).send({
        data: updateAddress,
        message: "Domicilio actualizado con éxito.",
      });
    return res
      .status(404)
      .send({ message: "Domicilio de usuario no encontrado" });
  } catch (error: any) {
    res.status(500).send({ message: "Ha habido un problema con tu pedido" });
  }
};

export const deleteAddress: RequestHandler = async (req, res) => {
  try {
    const { id, idAd } = req.params;
    const user = await Users.findById(id);
    const provider = await Providers.findById(id);
    if (user) {
      const userAddress = await Addresses.findById(idAd);
      const newAddresses: any = [];
      for (let i = 0; i < user.addresses.length; i++) {
        if (user.addresses[i].name !== userAddress.name) {
          newAddresses.push(user.addresses[i])
        }
      }
      user.addresses = newAddresses;
      await user.save()
      const deleteAddress = await Addresses.findByIdAndDelete(idAd);
      if (deleteAddress)
        return res.send({
          message: `Domicilio ${deleteAddress.name} eliminado con éxito.`,
        });
      return res
        .status(404)
        .send({ message: "Domicilio de usuario no encontrado" });
    } else if (provider) {
      const deleteAddress = await Addresses.findByIdAndDelete(idAd);
      if (deleteAddress)
        return res.send({
          message: `Domicilio ${deleteAddress.name} eliminado con éxito.`,
        });
      return res
        .status(404)
        .send({ message: "Domicilio de prestador no encontrado" });
    }
  } catch (error: any) {
    res.status(500).send({ message: "Ha habido un problema con tu pedido" });
  }
};
