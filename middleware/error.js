const errorHandler = (err, req, res, next) => {

    const error = { ...err };
    error.message = err.message;

    if (error.name === "JsonWebTokenError" && error.message === "invalid token") {
      error.message = "Буруу токен дамжуулсан байна!";
      error.statusCode = 400;
    }
  
    if (error.code === 11000) {
      error.message = "Энэ талбарын утгыг давхардуулж өгч болохгүй!";
      error.statusCode = 400;
    }
  
    res.status(err.statusCode || 500).json({
      success: false,
      error,
    });
  };
  
  module.exports = errorHandler;