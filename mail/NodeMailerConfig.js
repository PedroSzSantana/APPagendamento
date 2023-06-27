const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "748c1bc9f4043f",
    pass: "ef306cec422fd9",
  },
});
module.exports = transporter;
