const { response } = require("../helper/common");
const newError = require("http-errors");

const uploadSingle = (req, res, next) => {
  // const namaFile = req.body.file_name
  try {
    const data = {
      file: `http://localhost:4000/file/` + req.file.filename,
      // setingName: namaFile
    };

    response(res, data, 201, "upload file success");
  } catch (error) {
    console.log(error);
    next(new newError.InternalServerError());
  }
};

module.exports = {
  uploadSingle,
};
