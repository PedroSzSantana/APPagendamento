const AppointmentService = require("../services/AppointmentService");

const SendNotification = async () => {
  try {
    await AppointmentService.SendNotified();
  } catch (error) {
    throw error;
  }
};
module.exports = SendNotification;
