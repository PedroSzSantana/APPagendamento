const { transporter } = require("./NodeMailerConfig");

const sendMail = (email, time) => {
  transporter.sendMail({
    from: "Agendamento <pedrosouza-dev@hotmail.com>",
    to: email,
    subject: "Email Teste",
    text: `Voce tem um exame marcado as ${time}`,
  });
};
module.exports = sendMail;
