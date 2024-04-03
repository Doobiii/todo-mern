const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");

//sign-up
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Email already register in Our Database" });
    }

    // Create a new user
    const newUser = new User({ email, username, password: hashpassword });
    await newUser.save();

    return res.status(200).json({ message: "Sign Up Successfull" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
//login
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({ message: "Signup first" });
    }

    const isRightPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isRightPassword) {
      return res.status(200).json({ message: "Password not correct" });
    }
    const { password, ...others } = user._doc;
    return res.status(200).json({ others });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

// const router = require("express").Router();
// const User = require("../model/user");

// router.post("/register", async (req, res) => {
//   try {
//     const { email, username, password } = req.body;
//     const user = new User({ email, username, password });
//     await user.save().then(() => {
//       res.status(200).json({ user: user });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: "User Already exist" });
//   }
// });
// module.exports = router;
