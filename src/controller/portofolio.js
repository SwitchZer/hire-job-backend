const { v4: uuidv4 } = require("uuid");
const newError = require("http-errors");
const { response } = require("../helper/common");
const {
  postPortofolio,
  readProfilePortofolio,
  dropPortofolio,
  readPortofolioIdWorkers,
  updatePortofolio,
} = require("../models/portofolio");

// Add Portofolio
const addPortofolio = async (req, res, next) => {
  const email = req.decoded.email;
  const { application_name, link_repository, application, image } = req.body;
  const id = uuidv4();
  const dataPortofolio = {
    portofolio_id: id,
    application_name,
    link_repository,
    application,
    image,
  };

  try {
    await postPortofolio(dataPortofolio, email);
    response(res, dataPortofolio, 200, "Portofolio successfully Added!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Add Portofolio

// Get Portofolio Profile
const getProfilePortofolio = async (req, res, next) => {
  try {
    const email = req.decoded.email;

    const { rows } = await readProfilePortofolio(email);

    if (rows == 0) {
      return next(new newError.NotFound("Portofolio Not Found"));
    }
    response(res, rows, 200, "get Portofolio success");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get Portofolio Profile

// Delete Portofolio
const deletePortofolio = async (req, res, next) => {
  const id = req.params.id;
  try {
    await dropPortofolio(id);
    response(res, { id }, 200, `Portofolio Succesfully Deleted!!!`);
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Delete Portofolio

// Get Portofolio by Id Workers
const getPortofolioIdWorkers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { rows } = await readPortofolioIdWorkers({ worker_id: id });
    response(res, rows, 200, "get portfolio success");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get by id Workers

// Update Portofolio
const putPortofolio = async (req, res, next) => {
  const email = req.decoded.email;
  const { application_name, link_repository, application, image } = req.body;
  const dataPortofolio = {
    application_name,
    link_repository,
    application,
    image,
  };
  try {
    await updatePortofolio(dataPortofolio, email);
    response(res, dataPortofolio, 200, "Data successfully Added!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Update Portofolio

module.exports = {
  addPortofolio,
  getProfilePortofolio,
  deletePortofolio,
  getPortofolioIdWorkers,
  putPortofolio,
};
