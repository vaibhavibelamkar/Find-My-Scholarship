import express from "express";
import { getSchemes } from "../controllers/scheme.controller.js";

const router = express.Router();

router.route("/all").post(getSchemes);

export default router;
