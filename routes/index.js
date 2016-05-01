var express = require('express');
var router = express.Router();
var path = require('path');
var urls = require(path.normalize('../modules/urls'));

//just to stay safe with user input in the 'new' route
var sanitizer = require('sanitizer');

//displays all
router.get('/', function(req, res, next) {
  res.end('hi');
  //urls.getList(res);
});


router.get('/:id', function(req, res, next) {
    var id = Number(req.params['id']);
    urls.getLink(id, res);
});


router.get('/new/*', function(req, res, next) {
  var url = sanitizer.sanitize(req.url.slice(5));
  //makes sure the url is valid before storing it
  if (url.substring(0,11) != 'http://www.' &&
    url.substring(0,12) != 'https://www.') {
    res.send({"response": "invalid_url_format"});
  } else {
    urls.newLink(url, res);
  }
});


module.exports = router;
