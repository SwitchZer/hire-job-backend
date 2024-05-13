const { v4: uuidv4 } = require("uuid");
const newError = require("http-errors");
const { response } = require("../helper/common");
const {
  registerSkills,
  readProfileSkills,
  dropSkills,
  readSkillIdWorkers,
} = require("../models/skill");

// Add Skills
const addSkills = async (req, res, next) => {
  const email = req.decoded.email;
  const { skill_name } = req.body;
  const id = uuidv4();
  const dataSkills = {
    id: id,
    skill_name,
  };

  try {
    await registerSkills(dataSkills, email);
    response(res, dataSkills, 200, "Skills successfully Added!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Add Skills

// Get Skills Profile
const getProfileSkills = async (req, res, next) => {
  try {
    const email = req.decoded.email;

    const { rows } = await readProfileSkills(email);

    response(res, rows, 200, "get skills success");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get Skills Profile

// Delete SKills
const deleteSkills = async (req, res, next) => {
  const id = req.params.id;
  try {
    await dropSkills(id);
    response(res, { id }, 200, `Skills Succesfully Deleted!!!`);
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Delete SKills

// Get Skill by Id Workers
const getSkillIdWorkers = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { rows } = await readSkillIdWorkers(id);
    if (rows == 0) {
      return next(new newError.NotFound("Skills Not Found"));
    }
    response(res, rows, 200, "Get Data Id Success!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get by id Workers

module.exports = {
  addSkills,
  getProfileSkills,
  deleteSkills,
  getSkillIdWorkers,
};
