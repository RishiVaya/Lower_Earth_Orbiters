const express = require("express");
const mongoose = require("mongoose");
import User from "../models/user";

const router = express.Router();
router.use(express.json());

router.post("/createUser", async (req: any, res: any) => {
  const { email, role } = req.query;

  const newUser = new User({
    email: email,
    role: role,
  });
const user = await User.create(newUser);
  res.status(201).json({ message: "User Created", user });
});

router.get("/getAllOperators", async (req: any, res: any) => {
  const { body } = req;

  const operators = await User.find({});
  res.status(201).json({ message: "Fetched operators", operators });
});

router.patch("/updateOperatorRole/:userId", async (req: any, res: any) => {
  const { body, params } = req;
  const id = new mongoose.Types.ObjectId(params.userId);

  const filter = { _id: id };

  const update = { role: body.body.role };

  await User.findOneAndUpdate(filter, update);

  const operator = await User.findOne(filter);
  res.status(201).json({ message: "Fetched operators", operator });
});

module.exports = router;
