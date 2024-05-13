const pool = require("../configs/db");

const registerUsers = (dataUsers) => {
  return pool.query(
    "INSERT INTO users (user_id, email, password, role) VALUES ($1, $2, $3, $4)",
    [dataUsers.user_id, dataUsers.email, dataUsers.password, dataUsers.role]
  );
};

const registerRecruiters = (dataRecruiters) => {
  return pool.query(
    `INSERT INTO recruiters (id, user_id, position, company, name, phone) VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      dataRecruiters.id,
      dataRecruiters.user_id,
      dataRecruiters.position,
      dataRecruiters.company,
      dataRecruiters.name,
      dataRecruiters.phone,
    ]
  );
};

const updateRecruiters = (dataRecruiters, email) => {
  return pool.query(
    "UPDATE recruiters SET company = $1, position = $2, city = $3, description = $4, instagram = $5, linkedin = $6, phone = $7, name = $8 FROM users WHERE recruiters.user_id = users.user_id AND users.email = $9",
    [
      dataRecruiters.company,
      dataRecruiters.position,
      dataRecruiters.city,
      dataRecruiters.description,
      dataRecruiters.instagram,
      dataRecruiters.linkedin,
      dataRecruiters.phone,
      dataRecruiters.name,
      email,
    ]
  );
};

const countRecruiters = () => {
  return pool.query("SELECT COUNT(*) AS total FROM recruiters");
};

module.exports = {
  registerRecruiters,
  registerUsers,
  updateRecruiters,
  countRecruiters,
};
