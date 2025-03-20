import { Announcement } from "../models/announcement.model.js";
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
