const pool = require("../configs/db");

const readWorkers = ({ limit, offset, search, sort, sortBy }) => {
  return pool.query(
    `SELECT * FROM workers ${
      search ? `WHERE name ILIKE '%${search}%'` : ""
    } ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
};

const registerUsers = (dataUsers) => {
  return pool.query(
    "INSERT INTO users (user_id, email, password, role) VALUES ($1, $2, $3, $4)",
    [dataUsers.user_id, dataUsers.email, dataUsers.password, dataUsers.role]
  );
};

const registerWorkers = (dataWorkers) => {
  return pool.query(
    "INSERT INTO workers (id, user_id, name, phone) VALUES ($1, $2, $3, $4)",
    [dataWorkers.id, dataWorkers.user_id, dataWorkers.name, dataWorkers.phone]
  );
};

const updateWorkers = (dataWorkers, email) => {
  return pool.query(
    "UPDATE workers SET job_desk = $1, domicile = $2, workplace = $3, description = $4, name = $5 FROM users WHERE workers.user_id = users.user_id AND users.email = $6",
    [
      dataWorkers.job_desk,
      dataWorkers.domicile,
      dataWorkers.workplace,
      dataWorkers.description,
      dataWorkers.name,
      email,
    ]
  );
};

const readoneWorkers = (id) => {
  return pool.query(
    "SELECT users.email,  workers.* FROM workers JOIN users ON workers.user_id = users.user_id WHERE workers.id = $1",
    [id]
  );
};

const dropWorkers = (id) => {
  return pool.query("DELETE FROM workers WHERE id = $1", [id]);
};

const dropUsers = (id) => {
  return pool.query(
    "DELETE FROM users WHERE user_id IN (SELECT user_id FROM workers WHERE id = $1)",
    [id]
  );
};

const countWorkers = (search) => {
  return pool.query(
    `SELECT COUNT(*) AS total FROM workers ${
      search
        ? `WHERE name ILIKE '%${search}%' OR job_desk ILIKE '%${search}%'`
        : ""
    }`
  );
};

const SelectSkillWorker = ({ id }) => {
  // console.log(id);
  return pool.query({
    rowMode: "array",
    text: "SELECT skills.skill_name FROM skills WHERE worker_id = $1",
    values: [id],
  });
};

const updatePhotoWorker = (urlPhoto, id) => {
  return pool.query("UPDATE workers SET photo = $1 WHERE user_id = $2", [
    urlPhoto,
    id,
  ]);
};

module.exports = {
  readWorkers,
  registerWorkers,
  registerUsers,
  dropWorkers,
  dropUsers,
  updateWorkers,
  readoneWorkers,
  countWorkers,
  updatePhotoWorker,
  SelectSkillWorker,
};
