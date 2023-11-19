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
    const dbConnection = await connectDb();
    const [existingUsers] = await dbConnection.query(
      "SELECT * FROM USERS WHERE email = ?",
      [req.body.email]
    );
    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 6);

    const user = {
      email: req.body.email,
      password: hashedPassword,
    };

    const [rows] = await dbConnection.query(
      "INSERT INTO USERS (email, password) VALUES (?, ?)",
      [user.email, user.password]
    );
    user.id = rows.insertId;

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    await res.json({
      token,
      message: "User created successfully.",
    });
  } catch (err) {
    next(err);
  }
};

const loginWithJwtAuth = async (req, res, next) => {
  try {
    const dbConnection = await connectDb();

    const [users] = await dbConnection.query(
      "SELECT id, password FROM USERS WHERE email = ?",
      [req.body.email]
    );
    if (users.length === 0) {
      return res.status(401).json({
        token: null,
        message: "Incorrect email or password.",
      });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        token: null,
        message: "Incorrect email or password.",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    res.json({
      token,
      message: "Login successful.",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUpWithJwtAuth,
  loginWithJwtAuth,
};
