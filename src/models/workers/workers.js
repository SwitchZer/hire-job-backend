const pool = require("../../configs/db");

const readWorkers = ({ limit, offset, search, sort, sortBy }) => {
  return pool.query(
    "SELECT workers.*, users.name, users.phone FROM workers JOIN users ON workers.user_id = users.user_id ORDER BY id ASC LIMIT $1 OFFSET $2",
    [limit, offset]
  );
};

const registerUsers = (dataUsers) => {
  return pool.query(
    "INSERT INTO users (user_id, email, password, name, phone) VALUES ($1, $2, $3, $4, $5)",
    [
      dataUsers.user_id,
      dataUsers.email,
      dataUsers.password,
      dataUsers.name,
      dataUsers.phone,
    ]
  );
};

const registerWorkers = (dataWorkers) => {
  return pool.query(`INSERT INTO workers (id, user_id) VALUES ($1, $2)`, [
    dataWorkers.id,
    dataWorkers.user_id,
  ]);
};

const updateUsers = (dataUsers, id) => {
  return pool.query(
    "UPDATE users SET name = $1 WHERE user_id = (SELECT user_id FROM workers WHERE id = $2)",
    [dataUsers.name, id]
  );
};

const updateWorkers = (dataWorkers, id) => {
  return pool.query(
    "UPDATE workers SET job_desk = $1, domicile = $2, workplace = $3, description = $4 WHERE id = $5",
    [
      dataWorkers.job_desk,
      dataWorkers.domicile,
      dataWorkers.workplace,
      dataWorkers.description,
      id,
    ]
  );
};

const readoneWorkers = (id) => {
  return pool.query(
    "SELECT workers.*, users.name, users.phone FROM workers JOIN users ON workers.user_id = users.user_id WHERE id = $1",
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

const searchWorkers = (name) => {
  return pool.query(
    "SELECT workers.*, users.name, users.phone FROM workers JOIN users ON workers.user_id = users.user_id WHERE name ILIKE $1",
    [`%${name}%`]
  );
};

const countWorkers = () => {
  return pool.query("SELECT COUNT(*) AS total FROM workers");
};

module.exports = {
  readWorkers,
  registerWorkers,
  registerUsers,
  dropWorkers,
  dropUsers,
  updateWorkers,
  updateUsers,
  readoneWorkers,
  searchWorkers,
  countWorkers,
};
