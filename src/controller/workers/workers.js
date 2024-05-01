const { v4: uuidv4 } = require("uuid");
const { response } = require("../../helper/common");
const {
  readWorkers,
  registerWorkers,
  registerUsers,
  dropWorkers,
  updateWorkers,
  readoneWorkers,
  updateUsers,
  dropUsers,
  searchWorkers,
  countWorkers,
} = require("../../models/workers/workers");
const newError = require("http-errors");

// Get Workers
const getWorkers = async (req, res, next) => {
  // const name = req.query.name;
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 3);
    const sort = req.query.sort || "name";
    const sortBy = req.query.sortBy || "ASC";
    const search = req.query.search || "";
    const offset = (page - 1) * limit;
    const { rows } = await readWorkers({
      limit,
      offset,
      sort,
      sortBy,
      search,
    });
    const {
      rows: [count],
    } = await countWorkers();
    const totalData = count.total;
    const totalPage = Math.ceil(totalData / limit);

    // await searchWorkers(name);
    const pagination = {
      limit,
      page,
      totalData,
      totalPage,
    };
    response(res, rows, 200, "Get Data Success", pagination);
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get Workers

// Post Workers and Users
const postWorkers = async (req, res, next) => {
  const { email, password, name, phone } = req.body;
  const userId = uuidv4();
  const id = uuidv4();
  const dataUsers = {
    user_id: userId,
    email,
    password,
    name,
    phone,
  };
  const dataWorkers = {
    id: id,
    user_id: userId,
  };
  try {
    await registerUsers(dataUsers);
    await registerWorkers(dataWorkers);
    response(res, dataUsers, 200, "Data successfully Added!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Post Workers and Users

// Update Workers and Users
const putWorkers = async (req, res, next) => {
  const id = req.params.id;
  const { name, job_desk, domicile, workplace, description } = req.body;

  const dataUsers = {
    name,
  };
  const dataWorkers = {
    job_desk,
    domicile,
    workplace,
    description,
  };
  try {
    await updateUsers(dataUsers, id);
    await updateWorkers(dataWorkers, id);
    response(res, dataWorkers, 200, "Data successfully Added!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Update Workers and Users

// Get by id Workers
const getidWorkers = async (req, res, next) => {
  const id = req.params.id;
  try {
    const {
      rows: [worker],
    } = await readoneWorkers(id);
    response(res, worker, 200, "Get Data Id Success!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get by id Workers

// Delete Workers and Users
const deleteWorkers = async (req, res, next) => {
  const id = req.params.id;
  try {
    await dropWorkers(id);
    await dropUsers(id);
    response(res, { id }, 200, `Workers Succesfully Deleted!!!`);
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Delete Workers and Users

// Search by Name
// const searchWorkers = async (req, res, next) => {
//   const name = req.params.name;
//   try {
//     await searchWorkers(name);
//   } catch (error) {
//     console.log(error);
//     next(new newError.InternalServerError());
//   }
// };
// Search by Name

module.exports = {
  putWorkers,
  postWorkers,
  deleteWorkers,
  getWorkers,
  getidWorkers,
  searchWorkers,
};
