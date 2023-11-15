const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandle");
const ErrorBuilder = require("../utils/errorBuilder");

exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new ErrorBuilder(
      "Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй байна.",
      401
    );
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new ErrorBuilder(
        "Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй байна.",
        401
        );
      }
      const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenObj.id;
    req.userPermission = tokenObj.permission;

    next();
  } catch(e) {
    throw new ErrorBuilder(
      "Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй байна.",
      401
    );
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userPermission)) {
      throw new ErrorBuilder(
        "Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй байна!",
        403
      );
    }

    next();
  };
};