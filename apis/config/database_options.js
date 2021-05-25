const options = (process.env.NODE_ENV && process.env.NODE_ENV.indexOf("test") !== -1) ?
  {
    host: "localhost",
    user: "root",
    password: "maricuchaston",
    database: "mock-app-db"
  }
  :
  {
    host: "localhost",
    user: "root",
    password: "maricuchaston",
    database: "app-db"
  }

module.exports = options;