const { v4: uuidv4 } = require("uuid");
const newError = require("http-errors");
const { response } = require("../helper/common");
const {
  postHire,
  readHireRecruiter,
  readHireWorkers,
} = require("../models/hire");

// Add Hire
const addHire = async (req, res, next) => {
  const email = req.decoded.email;
  const {
    message_purpose,
    workers_id,
    name_request_hire,
    email_request_hire,
    phone_request_hire,
    description_request_hire,
  } = req.body;
  const id = uuidv4();
  const dataHire = {
    hire_id: id,
    message_purpose,
    workers_id,
    name_request_hire,
    email_request_hire,
    phone_request_hire,
    description_request_hire,
  };

  try {
    await postHire(dataHire, email);
    response(res, dataHire, 200, "Hire successfully Added!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Add Hire

// Get Hire With Recruiter
const getHireRecruiter = async (req, res, next) => {
  try {
    const email = req.decoded.email;

    const { rows } = await readHireRecruiter(email);

    if (rows == 0) {
      return next(new newError.NotFound("Data Not Found"));
    }
    response(res, rows, 200, "get Hire with Recruiters success");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};

const getHireWorkers = async (req, res, next) => {
  try {
    const email = req.decoded.email;

    const { rows } = await readHireWorkers(email);

    if (rows == 0) {
      return next(new newError.NotFound("Data Not Found"));
    }
    response(res, rows, 200, "get Hire with Workers success");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};

module.exports = {
  addHire,
  getHireRecruiter,
  getHireWorkers,
};
