import { Announcement } from "../models/announcement.model.js";
import { Question } from "../models/question.model.js";
import { Scheme } from "../models/scheme.model.js";

export const addScheme = async (req, res) => {
  try {
    const {
      schemeName,
      gender,
      state,
      areaOfResidence,
      casteCategory,
      annualIncome,
      religion,
      benefits,
      schemeDocuments,
      siteLink,
    } = req.body;
    if (
      !schemeName ||
      !gender ||
      !state ||
      !areaOfResidence ||
      !casteCategory ||
      !annualIncome ||
      !religion ||
      !benefits ||
      !schemeDocuments ||
      !siteLink
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const scheme = await Scheme.findOne({ schemeName });
    if (scheme) {
      return res.status(400).json({
        success: false,
        message: "Scheme Already Exists.",
      });
    }
    await Scheme.create({
      schemeName,
      gender,
      state,
      areaOfResidence,
      casteCategory,
      annualIncome,
      religion,
      benefits,
      schemeDocuments,
      siteLink,
    });
    return res.status(201).json({
      success: true,
      message: "Scheme added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in adding scheme",
    });
  }
};

export const addAnnouncements = async (req, res) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    await Announcement.create({ title, content });
    return res.status(201).json({
      success: true,
      message: "Announcement Sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in adding announcement",
    });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error fetching questions",
      error: error.message,
    });
  }
};

// Answer a question
export const answerQuestion = async (req, res) => {
  try {
    const { answer, status } = req.body;
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { answer, status },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error answering question",
      error: error.message,
    });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting question",
      error: error.message,
    });
  }
};
