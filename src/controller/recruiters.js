const { v4: uuidv4 } = require("uuid");
const { response } = require("../helper/common");
const cloudinary = require("../configs/cloudinary");
const {
  registerRecruiters,
  registerUsers,
  updateRecruiters,
  updatePhotoRecruiter,
} = require("../models/recruiters");
const { findByemail } = require("../models/auth");
const newError = require("http-errors");

// Get Profile Recruiters
const profileRecruiters = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await findByemail(email, { relation: "recruiters" });

    delete user.password;
    response(res, user, 200, "get profile success");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Get Profile Recruiters

// Post Recruiters and Users
const bcrypt = require("bcrypt");
const saltRounds = 10;

const postRecruiters = async (req, res, next) => {
  const { email, password, name, phone, position, company } = req.body;
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
      role: "recruiter",
    };
    const dataRecruiters = {
      id: id,
      user_id: dataUsers.user_id,
      position,
      company,
      name,
      phone,
    };

    try {
      await registerUsers(dataUsers);
      await registerRecruiters(dataRecruiters);
      response(res, null, 200, "Data successfully Added!");
    } catch (error) {
      console.log(error);
      next(new newError.InternalServerError());
    }
  });
};
// Post Recruiters and Users

// Update Recruiters and Users
const putRecruiters = async (req, res, next) => {
  const email = req.decoded.email;
  const {
    name,
    phone,
    company,
    position,
    city,
    description,
    instagram,
    linkedin,
  } = req.body;

  const dataRecruiters = {
    company,
    position,
    city,
    description,
    instagram,
    linkedin,
    name,
    phone,
  };
  try {
    await updateRecruiters(dataRecruiters, email);
    response(res, dataRecruiters, 200, "Data successfully Added!");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};
// Update Recruiters and Users

// Update Photo Profile Recruiter
const updateProfileRecruiter = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await findByemail(email);

    const result = await cloudinary.uploader.upload(req.file.path);
    const urlPhoto = result.secure_url;
    await updatePhotoRecruiter(urlPhoto, user.user_id);
    response(
      res,
      { photo: urlPhoto },
      200,
      "update photo profile Recruiters success "
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Update Photo Profile Recruiter

module.exports = {
  putRecruiters,
  postRecruiters,
  profileRecruiters,
  updateProfileRecruiter,
};
