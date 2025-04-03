import express from "express";
import {
  addAnnouncements,
  addScheme,
  getAllQuestions,
  deleteQuestion,
  answerQuestion,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/addscheme").post(addScheme);
router.route("/addannouncements").post(addAnnouncements);
router.route("/questions").get(getAllQuestions);
router.route("/questions/:id").put(answerQuestion).delete(deleteQuestion);
export default router;
