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

export const DeleteList = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ListModel.findByIdAndDelete({ _id: id });
    if (item) {
      res.status(200).json({ message: "Item deleted successfully." });
    } else {
      res.status(404).json({ message: "List not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdateList = async (req, res) => {
  const { id } = req.params;
  try {
    const item = req.body;
    if (!item || Object.keys(item).length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide data to update." });
    }
    const updateItem = await ListModel.findByIdAndUpdate(id, item, {
      new: true,
      runValidators: true,
    });
    if (!updateItem) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(updateItem);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
