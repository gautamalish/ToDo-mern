import userModel from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const CreateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check if all fields are filled
    if (!(username && email && password)) {
      res.status(400).json({ message: "Fill up all the fields." });
      return;
    }
    // check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // encrypt the password
    const encPassword = await bcrypt.hashSync(password, 10);
    // create user using encrypted password
    const user = userModel({ username, email, password: encPassword });
    await user.save();
    const token = jwt.sign(
      { id: user._id, email, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    user.token = token;
    user.password = undefined;
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({ message: "Please fill up all the fields" });
      return;
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User doesn't exist" });
      return;
    }
    const comparison = await bcrypt.compare(password, user.password);
    if (!comparison) {
      res.status(400).send({ message: "Can't find the user." });
      return;
    } else if (comparison) {
      const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });
      user.password = undefined;
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, //1hour
      });
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: "Error:", err });
  }
};
