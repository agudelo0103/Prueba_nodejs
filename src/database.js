const mysql = require('mysql');

const conection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prueba_nodejs'
});


conection.connect(function (err) {
  if (err) {
    console.log(err)
  }
});

module.exports = conection;
