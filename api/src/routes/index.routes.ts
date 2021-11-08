import { Router } from "express";
import users from "./users.routes";
import providers from "./providers.routes";
import services from "./services.routes";
import events from "./events.routes";
import reservations from "./reservations.routes";
import auth from "./auth.routes";
import checkout from "./checkout.routes";
import pets from "./pets.routes";

const router = Router();

router.use("/users", users);
router.use("/services", services);
router.use("/providers", providers);
router.use("/events", events);
router.use("/auth", auth);
router.use("/reservations", reservations);
router.use("/checkout", checkout);
router.use("/pets", pets);
// router.use("/rating", rating);

export default router;
