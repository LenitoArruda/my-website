const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProjectSchema = new Schema({
  id: ObjectId,
  name: String,
  description: Array,
  tools: Array,
  link: String,
});

const ProjectModel = mongoose.model("projects", ProjectSchema);

module.exports = ProjectModel;
