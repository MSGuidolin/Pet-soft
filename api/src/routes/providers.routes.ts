import { Router } from "express";
import {
  CreateCalendar,
  getHoursByProvider,
  updateEventsHoursProvider,
} from "../controllers/calendar";
import {
  addServiceToProvider,
  getProvidersByService,
  addAllServicesToProvider,
  getServicesByProvider,
} from "../controllers/servicesProviders";
import {
  getAllProviders,
  // getProviderByName,
  getProviderById,
  deleteProvider,
  updateProvider,
} from "../controllers/providers";
import {
  getAllAddresses,
  getOneAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addresses";
import { getAllRating, getOneRating } from "../controllers/rating";

import upload from "../libs/multer";
//import passport from 'passport';
//passport.authenticate('jwt');
const router = Router();

router.get("/rating/:id", getAllRating);
// <<PLAIN PROVIDERS ROUTES>>
router.get("/", getAllProviders);
// router.get("/?name", getProviderByName);
router.get("/:id", getProviderById);
router.delete("/:id", deleteProvider);
router.put("/:id", updateProvider);

// <<Routes to providers' ratings>>
router.get("/review/:id", getAllRating);
// router.get("/rating/:id/:idrt", getOneRating);

//Calendar Routes to provider Route
router.post("/calendar", CreateCalendar);
router.get("/calendar/:id", getHoursByProvider);
router.put("/calendar/:id", updateEventsHoursProvider);

//service to provider Route
router.get("/:id/services", getServicesByProvider);
router.post("/services", addServiceToProvider);
router.post("/allServices", addAllServicesToProvider);
router.get("/services/:serviceName", getProvidersByService);

// <<Routes to providers' addresses>>
router.get("/:id/addresses", getAllAddresses);
router.get("/:id/addresses/:idAd", getOneAddress);
router.post("/:id/addresses", createAddress);
router.put("/:id/addresses/:idAd", updateAddress);
router.delete("/:id/addresses/:idAd", deleteAddress);

export default router;
