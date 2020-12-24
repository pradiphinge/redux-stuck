import express from "express";
import validator from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

import User from "../Models/User.js";

const router = express.Router();

const { check, validationResult } = validator;

// @route Get /api/v1/users
// @desc get Users
// @access
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    if (users) {
      return res.status(200).json(users);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(500).json([{ msg: "server error" }]);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .sort({ createdAt: -1 });
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(200).json({ msg: "User not found" });
    }
  } catch (err) {
    console.log("error finding user", err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    res.status(500).json([{ msg: "server error" }]);
  }
});

// @route POST /api/v1/users
// @desc Register User
// @access Public
router.post(
  "/",
  [
    check("name", "Please Provide a name").trim().not().isEmpty(),
    check("email", "Please provide a valid email").trim().isEmail(),

    check("password", "Please enter a password with 6 or more characters")
      .trim()
      .isLength({ min: 6 }),
    check("phone", "Phone number should be at least 10 digits")
      .trim()
      .isNumeric()
      .isLength({ min: 10 }),
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
    const { name, email, address, password, phone, role } = req.body;

    try {
      //check if email already with us
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: "User already exists!" }],
        });
      }
      user = new User({
        name,
        email,
        password,
        address,
        phone,
        role,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user = await user.save();
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
