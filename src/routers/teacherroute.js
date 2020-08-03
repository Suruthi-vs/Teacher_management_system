const express = require("express");

const teachermodel = require("../models/teachermodel");

const teacherroute = express.Router();

const teachermod=require("../models/teacher-mod");

teacherroute
  .get("/", async (req, res) => {
    res.json({
      teachermodel
    });
  })
  .get("/:id", (req, res) => {
    try {
      const teacher = teachermodel.find(teacher => {
        return teacher.id === parseInt(req.params.id);
      });
      if (teacher) {
        res.status(200).json({
          teacher
        });
      } else {
        res.status(400).send("No such  Employee Exist");
      }
    } catch {
      res.status(500).send("Internal Server Error!!!");
    }
  })
  .post("/", (req, res) => {
    try {
      let id = 1;
      teachermod.sync().then(Student => {
        teachermod.create({
          ...req.body,
          studentID: id
        });
      });
      res.status(200).json({});
    } catch (e) {
      console.error(e)
    }
  })
  .patch("/:id", async (req, res) => {
    try {
      const requiredStudent = await teachermod.findByPk(parseInt(req.params.id));
      let student = requiredStudent.get();
      student = {
        ...student,
        ...req.body
      };
      const updateResult = await requiredStudent.update(student);
      res.status(200).json({ student: updateResult.get() });
    } catch (e) {
      console.error(e)
      res.status(500).send("Internal Server Error");
    }
  })
  .delete("/:id", (req, res) => {
    try {
      let Teachername;
      for (let i = 0; i < teachermodel.length; i++) {
        console.log(teachermodel[i]);
        if (teachermodel[i].id === parseInt(req.params.id)) {
          Teachername = i;
        }
      }
      if (Teachername) {
        teachermodel.splice(Teachername, 1);
        res.status(200).json({});
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error!!!");
    }
  });
module.exports = teacherroute;
