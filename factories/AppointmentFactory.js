class AppointmentFactory {
  Build(simpleAppointment) {
    const DateSplit = simpleAppointment.date.split("-");
    const year = DateSplit[0];
    const month = DateSplit[1] - 1;
    const day = DateSplit[2];

    const timeSplit = simpleAppointment.time.split(":");
    const hour = parseInt(timeSplit[0]);
    const minutes = parseInt(timeSplit[1]);

    let startDate = new Date(year, month, day, hour, minutes, 0, 0);
    let EndDate = new Date(year, month, day, hour + 1, minutes, 0, 0);
    const appo = {
      id: simpleAppointment._id,
      title: simpleAppointment.name + " - " + simpleAppointment.description,
      start: startDate,
      end: EndDate,
      notified: simpleAppointment.notified,
    };
    return appo;
  }
}
module.exports = new AppointmentFactory();
