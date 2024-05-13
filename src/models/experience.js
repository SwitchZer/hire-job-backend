const pool = require("../configs/db");

const postExperience = (dataExperience, email) => {
  return pool.query(
    "INSERT INTO experience (experience_id, position, company, work_month, work_year, description, workers_id) SELECT $1, $2, $3, $4, $5, $6, workers.id FROM workers JOIN users ON workers.user_id = users.user_id WHERE users.email = $7",
    [
      dataExperience.experience_id,
      dataExperience.position,
      dataExperience.company,
      dataExperience.work_month,
      dataExperience.work_year,
      dataExperience.description,
      email,
    ]
  );
};

const readProfileExperience = (email) => {
  return pool.query(
    "SELECT experience.experience_id, experience.position, experience.company, experience.work_month, experience.work_year, experience.description, experience.created_at, experience.updated_at FROM experience JOIN workers ON experience.workers_id = workers.id JOIN users ON workers.user_id = users.user_id WHERE users.email = $1",
    [email]
  );
};

const readExperienceIdWorkers = (id) => {
  return pool.query(
    "SELECT experience.experience_id, experience.position, experience.company, experience.work_month, experience.work_year, experience.description, experience.created_at, experience.updated_at FROM experience JOIN workers ON experience.workers_id = workers.id JOIN users ON workers.user_id = users.user_id WHERE workers.id = $1",
    [id]
  );
};

const dropExperience = (id) => {
  return pool.query("DELETE FROM experience WHERE experience_id = $1", [id]);
};

const updateExperience = (dataExperience, email) => {
  return pool.query(
    "UPDATE experience SET position = $1, company = $2, work_month = $3, work_year = $4, description = $5 FROM workers JOIN users ON workers.user_id = users.user_id WHERE users.email = $6 AND experience.workers_id = workers.id",
    [
      dataExperience.position,
      dataExperience.company,
      dataExperience.work_month,
      dataExperience.work_year,
      dataExperience.description,
      email,
    ]
  );
};

module.exports = {
  postExperience,
  readProfileExperience,
  dropExperience,
  readExperienceIdWorkers,
  updateExperience,
};
