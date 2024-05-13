const pool = require("../configs/db");

const postHire = (dataHire, email) => {
  return pool.query(
    "INSERT INTO hire (hire_id, message_purpose, workers_id, name_request_hire, email_request_hire, phone_request_hire, description_request_hire, recruiters_id) SELECT $1, $2, $3, $4, $5, $6, $7, recruiters.id FROM recruiters JOIN users ON recruiters.user_id = users.user_id WHERE users.email = $8",
    [
      dataHire.hire_id,
      dataHire.message_purpose,
      dataHire.workers_id,
      dataHire.name_request_hire,
      dataHire.email_request_hire,
      dataHire.phone_request_hire,
      dataHire.description_request_hire,
      email,
    ]
  );
};

const readHireRecruiter = (email) => {
  return pool.query(
    `SELECT 
    hire.*,
    workers.name AS workers_name, workers.phone as workers_phone, workers.job_desk as workers_job_desk, workers.domicile as workers_domicile, workers.workplace as workers_workerplace,
    recruiters.name AS recruiters_name, recruiters.company as recruiters_company, recruiters.position as recruiters_position
    FROM workers JOIN hire ON workers.id = hire.workers_id JOIN recruiters ON hire.recruiters_id = recruiters.id 
	  JOIN users ON recruiters.user_id = users.user_id 
	  WHERE users.email = $1`,
    [email]
  );
};

const readHireWorkers = (email) => {
  return pool.query(
    `SELECT 
    hire.*,
    workers.name AS workers_name, workers.phone as workers_phone, workers.job_desk as workers_job_desk, workers.domicile as workers_domicile, workers.workplace as workers_workerplace,
    recruiters.name AS recruiters_name, recruiters.company as recruiters_company, recruiters.position as recruiters_position
    FROM workers JOIN hire ON workers.id = hire.workers_id JOIN recruiters ON hire.recruiters_id = recruiters.id 
	  JOIN users ON workers.user_id = users.user_id 
	  WHERE users.email = $1`,
    [email]
  );
};

module.exports = {
  postHire,
  readHireRecruiter,
  readHireWorkers,
};
