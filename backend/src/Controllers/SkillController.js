const SkillModel = require("../Models/SkillModel");

class SkillController {
  //Adding skill
  async store(req, res) {
    try {
      const createSkill = await SkillModel.create(req.body);
      return res.status(200).json(createSkill);
    } catch (error) {
      return res.status(400).json({
        message: `Fail to create skill!
            Error: ${error}`,
      });
    }
  }

  //List skills
  async index(req, res) {
    try {
      const skills = await SkillModel.find();

      if (!skills)
        return res
          .status(400)
          .json({ message: "There is no skills registered!" });

      return res.status(200).json(skills);
    } catch (error) {
      return res.status(400).json({
        message: `Fail to list skills!
                Error: ${error}`,
      });
    }
  }

  //List specific skill by id
  async show(req, res) {
    try {
      const { id } = req.params;
      const skill = await SkillModel.findById(id);
      console.log(skill);

      if (!skill) {
        return res.status(400).json({ message: "Skill does not exist" });
      }
      return res.status(200).json(skill);
    } catch (error) {
      return res.status(400).json({ message: "Verify skill id!" });
    }
  }
}

module.exports = new SkillController();
