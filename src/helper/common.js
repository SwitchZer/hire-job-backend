const response = (res, result, status, message) => {
  const resultPrint = {};
  resultPrint.status = "Success";
  (resultPrint.statusCode = status), (resultPrint.data = result);
  resultPrint.message = message;
  res.status(status).json(resultPrint);
};

module.exports = {
  response,
};
