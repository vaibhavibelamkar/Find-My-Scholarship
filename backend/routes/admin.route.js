import express from "express";
import { addScheme } from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/addscheme").post(addScheme);

export default router;
