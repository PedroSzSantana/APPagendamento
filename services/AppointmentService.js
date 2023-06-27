const moment = require("moment/moment");
const ModelAppo = require("../models/Appointment");
const sendMail = require("../mail/SendMail");

class AppointmentService {
  constructor() {
    this.ModelApp = ModelAppo;
  }
  async Create(name, email, cpf, description, date, time) {
    try {
      const newAppo = new this.ModelApp({
        name,
        email,
        cpf,
        description,
        date,
        time,
      });
      await newAppo.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async GetAll(showFinished) {
    if (showFinished) {
      return await this.ModelApp.find();
    } else {
      const appo = await this.ModelApp.find({ finished: false });
      return appo;
    }
  }
  async GetById(id) {
    try {
      let appointment = await this.ModelApp.findOne({ _id: id });
      if (!appointment) {
        throw new Error("Agendamento não encontrado");
      }
      return appointment;
    } catch (error) {
      cosnole.log(error);
      throw error;
    }
  }
  async Finished(id) {
    try {
      await this.ModelApp.findByIdAndUpdate(id, { finished: true });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async Search(query) {
    try {
      const search = await this.ModelApp.find().or([
        { email: query },
        {
          cpf: query,
        },
      ]);
      return search;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async SendNotified() {
    try {
      const dataAtual = moment().format("YYYY-MM-DD");
      const appo = await this.ModelApp.find({
        date: dataAtual,
        finished: false,
        notified: false,
      });
      var horaAtual = new Date();
      console.log(appo);
      appo.forEach(async (app) => {
        let date = app.time.split(":");
        let hour = Number(date[0]);
        let minutes = Number(date[1]);
        let horarioAgendado = new Date();
        horarioAgendado.setHours(hour);
        horarioAgendado.setMinutes(minutes);

        let horaAgendadaComUmaHoraAMais = new Date(
          horarioAgendado.getTime() + 60 * 60 * 1000
        );

        if (
          horaAtual >= horarioAgendado &&
          horaAtual < horaAgendadaComUmaHoraAMais
        ) {
          sendMail(app.email, app.time);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new AppointmentService();
