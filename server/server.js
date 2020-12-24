import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./api/user.js";
import authRoute from "./api/auth.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API is running");
});
//Define Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on PORT", PORT));
