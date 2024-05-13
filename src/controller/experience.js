const { v4: uuidv4 } = require("uuid");
const newError = require("http-errors");
const { response } = require("../helper/common");
const {
  postExperience,
  readProfileExperience,
  dropExperience,
  readExperienceIdWorkers,
  updateExperience,
} = require("../models/experience");

// Add Experience
const addExperience = async (req, res, next) => {
  const email = req.decoded.email;
  const { position, company, work_month, work_year, description } = req.body;
  const id = uuidv4();
  const dataExperience = {
    experience_id: id,
    position,
    company,
    work_month,
    work_year,
    description,
  };

  try {
    await postExperience(dataExperience, email);
    response(res, dataExperience, 200, "Experience successfully Added!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Add Experience

// Get Experience Profile
const getProfileExperience = async (req, res, next) => {
  try {
    const email = req.decoded.email;

    const { rows } = await readProfileExperience(email);

    response(res, rows, 200, "get Experience success");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get Experience Profile

// Delete Experience
const deleteExperience = async (req, res, next) => {
  const id = req.params.id;
  try {
    await dropExperience(id);
    response(res, { id }, 200, `Experience Succesfully Deleted!!!`);
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Delete Experience

// Get Experience by Id Workers
const getExperienceIdWorkers = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { rows } = await readExperienceIdWorkers(id);
    if (rows == 0) {
      return next(new newError.NotFound("Experience Not Found"));
    }
    response(res, rows, 200, "Get Experience Id Success!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get by id Workers

// Update Experience
const putExperience = async (req, res, next) => {
  const email = req.decoded.email;
  const { position, company, work_month, work_year, description } = req.body;
  const dataExperience = {
    position,
    company,
    work_month,
    work_year,
    description,
  };
  try {
    await updateExperience(dataExperience, email);
    response(res, dataExperience, 200, "Experience successfully Added!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Update Experience

module.exports = {
  addExperience,
  getProfileExperience,
  deleteExperience,
  getExperienceIdWorkers,
  putExperience,
};
