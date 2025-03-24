import express from "express";
import {
  checkEligibility,
  getProfile,
  sendQuestion,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/scholarships/check-eligibility").post(checkEligibility);
router.route("/profile").post(getProfile);
router.route("/questions").post(sendQuestion);

export default router;
