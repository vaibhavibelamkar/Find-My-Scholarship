import express from "express";
import {
  addAnnouncements,
  addScheme,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/addscheme").post(addScheme);
router.route("/addannouncements").post(addAnnouncements);

export default router;
