import { Router } from "express";
import {
  createService,
  getServices,
  getServiceDetail,
  updateService,
  deleteService,
  getServiceDetailByName,
} from "../controllers/getServices";
import upload from "../libs/multer";

const router = Router();

router.post("/", upload.single("image"), createService);
router.get("/", getServices);
router.get("/:id", getServiceDetail);
router.get("/name/:serviceName", getServiceDetailByName);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
