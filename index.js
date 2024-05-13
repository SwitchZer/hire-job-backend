require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
// const xss = require("xss");

const workersRoutes = require("./src/routes/workers");
const recruitersRoute = require("./src/routes/recruiters");
const loginRoute = require("./src/routes/auth");
const uploadRoutes = require("./src/routes/upload");
const skillsRoutes = require("./src/routes/skill");
const experienceRoutes = require("./src/routes/experience");
const portofolioRoutes = require("./src/routes/portofolio");
const hireRoutes = require("./src/routes/hire");

const PORT = process.env.PORT;
// app.use(xss('<script>alert("xss");</script>'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use("/workers", workersRoutes);
app.use("/recruiters", recruitersRoute);
app.use("/auth", loginRoute);
app.use("/upload", uploadRoutes);
app.use("/skills", skillsRoutes);
app.use("/experience", experienceRoutes);
app.use("/portofolio", portofolioRoutes);
app.use("/hire", hireRoutes);

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
