import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "config";

import User from "../models/User.js";

// POST
// user authentication
// public
export const userAuth = (req, res) => {
  // capture the credentials
  const { email, password } = req.body;

  // validate that credentials were recieved
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // check for a user with the given email then check that against the stored password associated with that email
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // the credentials have passed. sign the token
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
};

// POST
// get all users
// public ???
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET
// find a specific user
// PRIVATE
export const findUser = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};

// POST
// register new user
// public
export const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  await User.findOne({ email }).then((user) => {
    // checking to make sure there's not already a user with this email address in our database
    if (user) return res.status(400).json({ msg: "User already exists" });

    // we didn't find that email in our database so we can create a new user using the given credentials
    const newUser = new User({
      name,
      email,
      password,
    });

    // create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            // might need to change the config to an environment variable
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            function (err, token) {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
};

// DELETE
// delete a specific user
// PRIVATE
export const deleteUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false, err }));
};

// PATCH
// update user information
// PRIVATE
export const updateUser = (req, res) => {
  const user = req.body;

  User.findByIdAndUpdate(req.user.id, user)
    .then((updatedUser) => {
      res.status(202).json({ success: true });
    })
    .catch((error) => {
      res.status(404).json({ success: false, error });
    });
};
