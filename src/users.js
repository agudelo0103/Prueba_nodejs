const express = require("express")
const router = express.Router();

const conection = require('./database');

router.get('/', (req, res) => {
  const { user_name, password } = req.body
  if ((user_name && password) && (user_name.length > 0 && password.length > 0)) {
    conection.query(`SELECT user_id FROM usuarios WHERE user_name = '${user_name}' AND password = '${password}'`, (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          res.json('ya estás registrado');
        } else {
          res.json('credenciales incorrectas, por favor verifique');
        }
      } else {
        console.log(err);
      }
    });
  } else {
    res.json('ingresa todos los datos');
  }
});

router.post('/', (req, res) => {
  const { user_name, password } = req.body
  if ((user_name && password) && (user_name.length > 0 && password.length > 0)) {
    conection.query(`INSERT INTO usuarios VALUES (null, '${user_name}', '${password}')`, (err) => {
      if (!err) {
        res.json({status: 'usuario creado correctamente'});
      } else {
        if (err.sqlState == 23000) {
          res.json('Este usuario ya fue creado, por favor intenta con otro usuario');
        }
        console.log(err);
      }
    });
  }
});

module.exports = router;
