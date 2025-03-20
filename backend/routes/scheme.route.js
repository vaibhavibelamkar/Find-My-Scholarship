import express from "express";
import { getSchemes } from "../controllers/scheme.controller.js";

const router = express.Router();

router.route("/all").get(getSchemes);

export default router;
