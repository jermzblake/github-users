var express = require('express');
var router = express.Router();
const request = require('request');
// Each entry in .env will become a property on process.env
const token = process.env.GITHUB_TOKEN;
const rootURL = 'https://api.github.com/';

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('my token is:' + token)
  // this is how the server can access GET query parameters
  const username = req.query.username;
  const options = {
    url: `${rootURL}users/${username}`,
    headers: {
      'User-Agent': 'jermzblake',
      Authorization: `token ${token}`
    }
  };
 
  console.log(`username: ${username}`);
  request(options, function(err, response, body) {
      const userData = JSON.parse(body);
      // update the options url to fetch the user's repos
    options.url = userData.repos_url;
    request(options, function(err, response, body) {
      // add a repos property
      userData.repos = JSON.parse(body);
      console.log(userData.repos[0]);
      res.render('index', {userData});
    });
  });
})


module.exports = router;
