const { v4: uuidv4 } = require("uuid");

const handleError = (err, req, res) => {
  console.error(err);

  const errorId = uuidv4(); //? Generar un ID de seguimiento de errores único
  const errorMessage =
    "Ha ocurrido un error en el servidor. Por favor, inténtelo de nuevo más tarde o póngase en contacto con el soporte técnico si el problema persiste.";
  const errorDetails = process.env.NODE_ENV === "production" ? null : err.stack; //? Proporcionar detalles de seguimiento de errores solo en entornos de desarrollo

  const statusCode = err.statusCode || 500; //? Usar el código de estado de respuesta proporcionado por el error, o 500 si no se proporciona

  res.status(statusCode).json({
    id_error: errorId,
    message: errorMessage,
    detail: errorDetails,
    success: false,
  });
};

module.exports = handleError;
