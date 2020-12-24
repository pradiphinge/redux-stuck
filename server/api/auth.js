import express from "express";
import bcrypt from "bcryptjs";
import validator from "express-validator";
import config from "config";
import jwt from "jsonwebtoken";

import auth from "./middleware/auth.js";
import User from "../Models/User.js";

const router = express.Router();

const { check, validationResult } = validator;

router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: "the requested user is not found" }],
      });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.post(
  "/",
  [
    check("email", "Please provide a valid email").trim().isEmail(),

    check("password", "Please enter a password with 6 or more characters")
      .trim()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    //valid inputs proceed with registration
    const { email, password } = req.body;

    try {
      //check if email already with us
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: "Invalid Credentials" }],
        });
      }

      //decrypt password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: "Invalid credentials" }],
        });
      }

      //return jwt

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).json({
        success: false,
        errors: [{ msg: "server error" }],
      });
    }
  }
);

export default router;
