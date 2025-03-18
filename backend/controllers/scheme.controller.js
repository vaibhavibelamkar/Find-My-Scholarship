import { Scheme } from "../models/scheme.model.js";

export const getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res
      .status(201)
      .json({ success: true, message: "All schemes fetched !", data: schemes });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
