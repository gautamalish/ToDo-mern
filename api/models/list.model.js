import mongoose from "mongoose";

const ListSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const ListModel = mongoose.model("List", ListSchema);
export default ListModel;
