const { Router } = require("express");
const AppointmentService = require("../services/AppointmentService");
const AppointmentFactory = require("../factories/AppointmentFactory");

const routes = Router();

routes.get("/", (req, res) => {
  res.render("Index");
});

routes.get("/agendamento", (req, res) => {
  res.render("Create");
});

routes.post("/create", async (req, res) => {
  try {
    const { name, email, cpf, description, date, time } = req.body;
    await AppointmentService.Create(name, email, cpf, description, date, time);
    res.redirect("/");
  } catch (error) {
    res.status(404).json(error);
  }
});

routes.get("/getcalendar", async (req, res) => {
  let consultas = await AppointmentService.GetAll(false);

  let ArrAppo = [];
  consultas.map((appo) => {
    ArrAppo.push(AppointmentFactory.Build(appo));
  });

  res.json(consultas);
});

routes.get("/event/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let appointment = await AppointmentService.GetById(id);
    res.render("Event", { appointment });
  } catch (error) {
    res.status(500).json(error);
  }
});
routes.post("/finished", async (req, res) => {
  try {
    const id = req.body.id;
    await AppointmentService.Finished(id);
    res.redirect("/");
  } catch (error) {
    res.status(500).json(error);
  }
});
routes.get("/list", async (req, res) => {
  try {
    let Appo = await AppointmentService.GetAll(true);
    res.render("List", { Appo });
  } catch (error) {
    res.json(error);
  }
});
routes.get("/sourceresult", async (req, res) => {
  try {
    const Search = req.query.search;
    let Appo = await AppointmentService.Search(Search);
    res.render("List", { Appo });
  } catch (error) {
    res.json(error);
  }
});
module.exports = routes;
