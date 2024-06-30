// const setClient = require("../configs/redis");
// const { response } = require("../helper/common");

// const hitCacheProductDetail = async (req, res, next) => {
//   const client = await setClient();
//   const idUsers = req.params.id;
//   const product = await client.get(`workers/${idUsers}`);
//   console.log(product);
//   if (product) {
//     return response(
//       res,
//       JSON.parse(product),
//       200,
//       "get workers success from redis"
//     );
//   }
//   next();
// };

// const clearCacheProductDetail = async (req, res, next) => {
//   const client = await setClient();
//   const idUsers = req.params.id;
//   await client.del(`workers/${idUsers}`);
//   next();
// };

// module.exports = {
//   hitCacheProductDetail,
//   clearCacheProductDetail,
// };
