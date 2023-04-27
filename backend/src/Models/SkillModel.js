const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SkillSchema = new Schema({
  id: ObjectId,
  name: String,
  description: String,
  stars: Number,
  experience: Number,
  img: String,
});

const SkillModel = mongoose.model("skills", SkillSchema);

module.exports = SkillModel;
