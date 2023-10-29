require("dotenv").config();

module.exports = {
  development: {
    username: "eshita",
    password: "HM9TyGZ7d7GvFlWNJsIznSDVAj3QVyIT",
    database: "test01_ble0",
    host: "dpg-ckrb6s62eoec73ef3rgg-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
  test: {
    username: "postgres",
    password: "islam",
    database: "budget_buddy",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
