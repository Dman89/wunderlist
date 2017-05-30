const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const deleteUser = require("../services/deleteUser");
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
const axios = require('axios');
const stringify = require('json-stringify-safe');
const client_id = "0af52551e0973c7faa55";
const cs = process.env.CS || "Pokemon";

module.exports = function(app) {
  app.get('/api/profile', requireAuth, function(req, res) {
    res.status(200).send({user: req.user});
  })
  app.post('/api/signup', Authentication.signup);
  app.post('/api/signin', requireLogin, Authentication.login);
  app.post('/api/post', function(req, res) {
    const config = {headers: req.body.headers};
    const code = req.body.code;
    const payload = {code: code, client_id: client_id, client_secret: cs}
    console.log(payload);
    console.log('\n\n');
    console.log(config);
    console.log('\n\n');
    axios.post('https://www.wunderlist.com/oauth/access_token', payload, config)
    .then(function (data) {
      res.status(200).send({data: data.data.access_token})
    })
    .catch(function (data) {
      res.status(403).send({data: data})
    })
  });



  app.delete('/api/a666Route', deleteUser);



}
