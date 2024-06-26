const setClient = require("../configs/redis");
const { response } = require("../helper/common");
const { findByemail } = require("../models/auth");

const hitCacheProfileId = async (req, res, next) => {
  const client = await setClient();

  const email = req.decoded.email;
  const {
    rows: [worker],
  } = await findByemail(email);
  const id = worker.id;
  console.log(id);

  const experience = await client.get(`worker/${id}`);

  if (experience) {
    return response(
      res,
      JSON.parse(experience),
      200,
      `get worker (${id}) experience success from redis`
    );
  }

  next();
};

const clearCacheProfileId = async (req, res, next) => {
  const client = await setClient();

  const email = req.decoded.email;
  const {
    rows: [worker],
  } = await findByemail(email);
  const id = worker.id;
  console.log(id);

  await client.del(`worker/${id}`);
  next();
};

module.exports = {
  hitCacheProfileId,
  clearCacheProfileId,
};
