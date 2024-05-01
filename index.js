require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const workersRoutes = require("./src/routes/workers/workers");

const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use("/workers", workersRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const messageError = error.message || "Internal Server Error";
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: messageError,
  });
});

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
