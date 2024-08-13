import ListModel from "../models/list.model.js";

export const GetLists = async (req, res) => {
  try {
    const result = await ListModel.find();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const PostList = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newItem = new ListModel({ title, description });
    await newItem.save();
    res.status(201).json({ newItem });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
