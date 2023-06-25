const AppointmentService = require("../services/AppointmentService");

const SendNotification = async () => {
  try {
    await AppointmentService.SendNotified();
  } catch (error) {
    console.log(error);
  }
};
module.exports = SendNotification;
