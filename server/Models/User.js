import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    picture: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: { values: ["user", "admin"] },
      default: "user",
    },
    phone: { type: Number, minlength: 10 },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    address: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
