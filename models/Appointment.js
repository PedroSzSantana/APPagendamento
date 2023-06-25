const { Schema, default: mongoose } = require("mongoose");

const ModelAppo = new Schema({
  name: String,
  email: String,
  cpf: String,
  description: String,
  date: String,
  time: String,
  finished: { type: Boolean, default: false },
  notified: { type: Boolean, default: false },
});
module.exports = mongoose.model("appointment", ModelAppo);
