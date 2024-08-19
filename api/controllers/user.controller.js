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
        expiresIn: "2hr",
      }
    );
    user.token = token;
    user.password = undefined;
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
