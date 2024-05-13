const { createClient } = require("redis");
const setClient = async () => {
  const result = await createClient(6379)
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
  return result;
};

module.exports = setClient;
