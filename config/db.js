const Sequelize = require("sequelize");

var db = {};

const sequelize = new Sequelize("tally", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
  operatorAliases: false,
});

const models = [
  require("../models/User"),
  require("../models/Product"),
  require("../models/Card"),
  require("../models/Test"),
];

models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

db.sequelize = sequelize;
module.exports = db;
