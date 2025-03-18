import express from "express";
import {
  checkEligibility,
  getProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/scholarships/check-eligibility").post(checkEligibility);
router.route("/profile").post(getProfile);

export default router;
