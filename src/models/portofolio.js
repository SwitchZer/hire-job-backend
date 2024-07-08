const pool = require("../configs/db");

const postPortofolio = (dataPortofolio, email) => {
  return pool.query(
    "INSERT INTO portofolio (portofolio_id, application_name, link_repository, application, image, workers_id) SELECT $1, $2, $3, $4, $5, workers.id FROM workers JOIN users ON workers.user_id = users.user_id WHERE users.email = $6",
    [
      dataPortofolio.portofolio_id,
      dataPortofolio.application_name,
      dataPortofolio.link_repository,
      dataPortofolio.application,
      dataPortofolio.image,
      email,
    ]
  );
};

const readProfilePortofolio = (email) => {
  return pool.query(
    "SELECT portofolio.portofolio_id, portofolio.application_name, portofolio.link_repository, portofolio.application, portofolio.image, portofolio.created_at, portofolio.updated_at FROM portofolio JOIN workers ON portofolio.workers_id = workers.id JOIN users ON workers.user_id = users.user_id WHERE users.email = $1",
    [email]
  );
};

const readPortofolioIdWorkers = (worker_id) => {
  return pool.query(
    "SELECT id,  application_name, link_repository, application, image, created_at, updated_at FROM portofolio WHERE workers_id = $1",
    [worker_id]
  );
};

const dropPortofolio = (id) => {
  return pool.query("DELETE FROM portofolio WHERE portofolio_id = $1", [id]);
};

const updatePortofolio = (dataPortofolio, email) => {
  return pool.query(
    "UPDATE portofolio SET application_name = $1, link_repository = $2, application = $3, image = $4 FROM workers JOIN users ON workers.user_id = users.user_id WHERE users.email = $5 AND portofolio.workers_id = workers.id",
    [
      dataPortofolio.application_name,
      dataPortofolio.link_repository,
      dataPortofolio.application,
      dataPortofolio.image,
      email,
    ]
  );
};

module.exports = {
  postPortofolio,
  readProfilePortofolio,
  dropPortofolio,
  readPortofolioIdWorkers,
  updatePortofolio,
};
