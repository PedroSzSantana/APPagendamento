const AppointmentFactory = require("../factories/AppointmentFactory");
const ModelAppo = require("../models/Appointment");

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
      let ArrAppo = [];
      appo.map((appo) => {
        ArrAppo.push(AppointmentFactory.Build(appo));
      });
      return ArrAppo;
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
      const appo = await this.GetAll(false);
      appo.forEach((app) => {
        let date = app.start.getTime();
        let hour = 1000 * 60 * 60;
        console.log("Date ------------", date);
        let gap = date - Date.now();
        console.log(hour);
        console.log(gap);
        if (gap < hour) {
          console.log(app.title);
          console.log("Enviar Mensagem");
        }
      });
      console.log(appo);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new AppointmentService();
