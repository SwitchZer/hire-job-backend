const { v4: uuidv4 } = require("uuid");
const { response } = require("../helper/common");
const cloudinary = require("../utils/cloudinary");
const {
  readWorkers,
  registerWorkers,
  registerUsers,
  dropWorkers,
  updateWorkers,
  readoneWorkers,
  dropUsers,
  countWorkers,
  updatePhoto,
} = require("../models/workers");
const { findByemail } = require("../models/auth");
const newError = require("http-errors");

// Get Workers
const getWorkers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
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
    const searchResults = rows.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    const pagination = {
      limit,
      page,
      totalData,
      totalPage,
    };
    response(res, searchResults, 200, "Get Data Success", pagination);
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get Workers

// Get Profile Workers
const profileWorkers = async (req, res, next) => {
  try {
    const email = req.decoded.email;

    const {
      rows: [user],
    } = await findByemail(email, { relation: "workers" });

    delete user.password;
    response(res, user, 200, "get profile success");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get Profile Workers

// Post Workers and Users
const bcrypt = require("bcrypt");
const setClient = require("../configs/redis");
const saltRounds = 10;

const postWorkers = async (req, res, next) => {
  const { email, password, name, phone } = req.body;
  const userId = uuidv4();
  const id = uuidv4();
  const {
    rows: [user],
  } = await findByemail(email);
  if (user) {
    return next(newError(403, "User Sudah terdaftar"));
  }

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) {
      return next(newError(500, "Error hashing password"));
    }

    const dataUsers = {
      user_id: userId,
      email,
      password: hash,
      role: "worker",
    };
    const dataWorkers = {
      id: id,
      user_id: dataUsers.user_id,
      name,
      phone,
    };

    try {
      await registerUsers(dataUsers);
      await registerWorkers(dataWorkers);
      response(res, null, 200, "Data successfully Added!");
    } catch (error) {
      console.log(error);
      next(new newError.InternalServerError());
    }
  });
};
// Post Workers and Users

// Update Workers and Users
const putWorkers = async (req, res, next) => {
  const email = req.decoded.email;
  const { name, job_desk, domicile, workplace, description } = req.body;

  const dataWorkers = {
    job_desk,
    domicile,
    workplace,
    description,
    name,
  };
  try {
    await updateWorkers(dataWorkers, email);
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
    if (!worker) {
      return next(new newError.NotFound("User Not Found"));
    }
    const client = await setClient();
    await client.setEx(`workers/${id}`, 60 * 60, JSON.stringify(worker));
    res.json({
      status: "success",
      data: worker,
    });
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

// Update Photo Workers
const updateFoto = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await findByemail(email);

    const result = await cloudinary.uploader.upload(req.file.path);
    const urlPhoto = result.secure_url;
    await updatePhoto(urlPhoto, user.user_id);
    response(
      res,
      { photo: urlPhoto },
      200,
      "update photo profile workers success "
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Update Photo Workers

module.exports = {
  putWorkers,
  postWorkers,
  deleteWorkers,
  getWorkers,
  getidWorkers,
  profileWorkers,
  updateFoto,
};
