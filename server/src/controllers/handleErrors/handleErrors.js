const { v4: uuidv4 } = require("uuid");

/**
 * Handles errors and sends an error response to the client.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const handleError = (err, req, res) => {
  console.error(err);
  console.log('helololokpokjoijoi');

  const errorId = uuidv4();
  const errorMessage =
    "Ha ocurrido un error en el servidor. Por favor, inténtelo de nuevo más tarde o póngase en contacto con el soporte técnico si el problema persiste.";
  const errorDetails = process.env.NODE_ENV === "production" ? null : err.stack;

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    id_error: errorId,
    message: errorMessage,
    detail: errorDetails,
    success: false,
  });
};

module.exports = handleError;
