const { default: mongoose } = require("mongoose");

const MongoConnect = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/agendamento");
    console.log("Mongo Connect");
  } catch (error) {
    console.log(error);
  }
};
module.exports = MongoConnect;
