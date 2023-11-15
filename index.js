const express = require("express");
var xmlparser = require("express-xml-bodyparser");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
const connectDB = require("./config/db");
const cors = require("cors");

const errorHandler = require("./middleware/error");
var morgan = require("morgan");
const logger = require("./middleware/logger");
const fileupload = require("express-fileupload");

// Router оруулж ирэх
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cardRoute = require("./routes/card");

const injectDb = require("./middleware/injectDb");

// Аппын тохиргоог process.env рүү ачааллах
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.static("public"));
// Body parser
app.use(express.json());

// create a write stream (in append mode)
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

var corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(
  fileupload({
    limits: { fileSize: 50000000 * 3000 * 3000 },
    useTempFiles: false,
    tempFileDir: "./public/upload/tmp/",
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(cors(corsOptions));
app.use(logger);
app.use(injectDb(connectDB));
app.use(morgan("combined", { stream: accessLogStream }));

// Route List
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/card", cardRoute);

app.use("/pimages", express.static(__dirname + "/public/upload/user/profile"));
app.use(xmlparser());

app.use(errorHandler);

connectDB.product.belongsTo(connectDB.user);
connectDB.card.belongsTo(connectDB.user);
connectDB.card.belongsTo(connectDB.product);

connectDB.sequelize
  .sync({ alter: false })
  .then((result) => {
    console.log("Sync хийгдлээ!");
  })
  .catch((err) => console.log(err));

const server = app.listen(
  process.env.PORT,
  console.log(`Express сэрвэр ${process.env.PORT} порт дээр аслаа... `)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
