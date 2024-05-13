const pool = require("../configs/db");

const registerSkills = (dataSkills, email) => {
  return pool.query(
    "INSERT INTO skills (id, skill_name, workers_id) SELECT $1, $2, workers.id FROM workers JOIN users ON workers.user_id = users.user_id WHERE users.email = $3",
    [dataSkills.id, dataSkills.skill_name, email]
  );
};

const readProfileSkills = (email) => {
  return pool.query(
    "SELECT skills.id, skills.skill_name FROM skills JOIN workers ON skills.workers_id = workers.id JOIN users ON workers.user_id = users.user_id WHERE users.email = $1",
    [email]
  );
};

const readSkillIdWorkers = (id) => {
  return pool.query(
    "SELECT skills.id, skills.skill_name FROM skills JOIN workers ON skills.workers_id = workers.id JOIN users ON workers.user_id = users.user_id WHERE workers.id = $1",
    [id]
  );
};

const dropSkills = (id) => {
  return pool.query("DELETE FROM skills WHERE id = $1", [id]);
};

module.exports = {
  registerSkills,
  readProfileSkills,
  dropSkills,
  readSkillIdWorkers,
};
