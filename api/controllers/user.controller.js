import userModel from "../models/users.model";

export const CreateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = userModel({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
