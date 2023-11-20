const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDb = require("../../models/database");

/**
 * Handles the sign up process with JWT authentication.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the sign up process is completed.
 */
const signUpWithJwtAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const dbConnection = await connectDb();

    const [existingUsers] = await dbConnection.query(
      "SELECT * FROM USERS WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await dbConnection.query(
      "INSERT INTO USERS (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    const userId = result.insertId;

    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    }); // Added token expiration

    return res.status(201).json({
      token,
      message: "User created successfully.",
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
const loginWithJwtAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const dbConnection = await connectDb();

    const [users] = await dbConnection.query(
      "SELECT id, password FROM USERS WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        token: null,
        message: "Incorrect email or password.",
      });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        token: null,
        message: "Incorrect email or password.",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    }); //? token expiration

    return res.json({
      token,
      message: "Login successful.",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return next(err);
  }
};

module.exports = {
  signUpWithJwtAuth,
  loginWithJwtAuth,
};
