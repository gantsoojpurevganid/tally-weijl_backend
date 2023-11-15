const path = require("path");
const fs = require("fs");
const ErrorBuilder = require("../utils/errorBuilder");

module.exports = async function ({
  file = null,
  dir = "./public/upload/user/profile/",
  rte = "pimages",
  old = null,
  module = "profile",
}) {
  if (old) {
    if (module === "profile" && old !== "default.png") {
      const url = new URL(old);
      const textAfterSlash = url.pathname.split("/").pop();
      fs.unlink(
        __dirname + `/../public/upload/user/profile/${textAfterSlash}`,
        function (err) {
          if (err) {
          }
        }
      );
    } else if (module === "product" && old !== "default.png") {
      const url = new URL(old);
      const textAfterSlash = url.pathname.split("/").pop();
      const filePath = path.join(
        __dirname,
        `/../public/upload/product/${textAfterSlash}`
      );
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, function (err) {
          if (err) {
            console.log("err ::: ", err);
          }
        });
      }
    }
  }
  const imageName = new Date().getTime() + "_" + file.name;
  const iType = path.extname(file.name).toLowerCase();
  if (
    iType !== ".jpg" &&
    iType !== ".jpeg" &&
    iType !== ".png" &&
    iType !== ".gif"
  ) {
    throw new ErrorBuilder(
      'Зургын өргөтгөл: "jpg, jpeg, png, gif" өргөтгөлтэй байх ёстой!',
      400
    );
  }
  await file.mv(dir + imageName, function async(err) {
    if (err) {
    }
  });
  return `${process.env.HOST}${rte}/${imageName}`;
};
