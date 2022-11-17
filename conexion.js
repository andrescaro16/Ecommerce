const mysql = require("mysql");
// Coloca aquí tus credenciales
module.exports = mysql.createPool({
  host: "127.0.0.1",
  user: "dbuser",
  password: "Eafit2022.",
  database: "ecommerce"
});