const { Router } = require("express");
const routes = Router();

//Importing Controllers
const SkillController = require("./Controllers/SkillController");
//const ProjectController = require("./Controllers/ProjectController");

//Skills routes
routes.post("/skills", SkillController.store);
routes.get("/skills", SkillController.index);
routes.get("/skills/:id", SkillController.show);

//Projects routes
module.exports = routes;
