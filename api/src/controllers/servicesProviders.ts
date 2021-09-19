import { RequestHandler } from 'express';
import Providers from '../models/Providers';
import Services from '../models/Services';
import { getServiceDetail } from './getServices';

export const addServiceToProvider: RequestHandler = async (req, res) => {
  try {
    const service = await Services.findById(req.body.service);
    const provider = await Providers.findById(req.body.provider);

    let check = false;
    service.providers.forEach((provider: any) => {
      if (provider._id == req.body.provider) check = true;
    });
    if (check) {
      return res.status(301).send('The service has already been registered');
    } else {
      provider?.services.push(service);
      provider?.save();
      service.providers.push(provider);
      service.save();
      return res.status(200).send('Service added successfully');
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getProvidersByService: RequestHandler = async (req, res) => {
  try {
    const { serviceName } = req.params;
    const service = await Services.findOne({ name: serviceName });
    res.status(200).send(service.providers);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const getServicesByProvider: RequestHandler = async (req, res) => {
  try {
    const provServices: any = [];
    const thisProvider: any = await Providers.findById(req.params.id);
    for (let i = 0; i < thisProvider.services.length; i++) {
      const service = await Services.findById(thisProvider.services[i]);
      provServices.push(service);
    }
    // const provServices = await Services.findById({
    //   $in: thisProvider.services,
    // });
    // console.log('ARREGLO: ', provServices);
    return res.status(200).send({
      message: `Éstos son los servicios de ${thisProvider?.firstName}`,
      data: provServices,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const addAllServicesToProvider: RequestHandler = async (req, res) => {
  try {
    const { services, provider } = req.body;

    const prov = await Providers.findById(provider);

    if (prov) {
      prov.services.forEach(async (service_id: any) => {
        const prevService = await Services.findByIdAndUpdate(
          service_id,
          { $pull: { providers: provider } },
          { multi: true }
        );
        await prevService.save();
      });

      services.forEach(async (service_name: any) => {
        const newService = await Services.findOneAndUpdate(
          { name: service_name },
          { $push: { providers: prov } },
          { multi: true }
        );
        await newService.save();
      });

      const allServices = await Services.find({ name: { $in: services } });

      prov.services = allServices.map((serv: any) => serv._id);
      await prov.save();

      return res.status(200).send(prov);
    } else {
      return res.status(404).send('Provider not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
