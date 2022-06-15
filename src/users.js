const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const conection = require('./database');

router.get('/', (req, res) => {
  const { user_name, password } = req.body

  if ((user_name && password) && (user_name.length > 0 && password.length > 0)) {
    conection.query(`SELECT user_id FROM users WHERE user_name = '${user_name}' AND password = '${password}'`, (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          jwt.sign({user_name, password}, 'secretKey', (err, token) => {
            if (err) res.json('Ocurrio un error');
            res.json({
              message: 'Logueado correctamente',
              token
            })
          });
        } else {
          res.json('Credenciales incorrectas, por favor verifique');
        }
      } else {
        console.log(err);
      }
    });
  } else {
    res.json('Ingresa todos los datos');
  }
});

router.post('/', (req, res) => {
  const { user_name, password } = req.body

  if ((user_name && password) && (user_name.length > 0 && password.length > 0)) {
    conection.query(`INSERT INTO users VALUES (null, '${user_name}', '${password}')`, (err2) => {
      if (!err2) {
        jwt.sign({user_name, password}, 'secretKey', (err, token) => {
          if (err) res.json('Ocurrio un error');
          res.json({
            message: 'Usuario creado correctamente',
            token
          })
        });
      } else {
        if (err2.sqlState == 23000) {
          res.json('Este usuario ya fue creado, por favor intenta con otro usuario');
        }
      }
    });
  }  
});

module.exports = router;