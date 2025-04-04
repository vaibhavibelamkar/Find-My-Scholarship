import express from "express";
import {
  addAnnouncements,
  addScheme,
  getAllQuestions,
  deleteQuestion,
  answerQuestion,
} from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/addscheme").post(protect, adminOnly, addScheme);
router.route("/addannouncements").post(protect, adminOnly, addAnnouncements);
router.route("/questions").get(protect, adminOnly, getAllQuestions);
router
  .route("/questions/:id")
  .put(protect, adminOnly, answerQuestion)
  .delete(protect, adminOnly, deleteQuestion);

export default router;
