var express = require('express');
var router = express.Router();
var urls = require('../modules/urls');

//just to stay safe with user input in the 'new' route
var sanitizer = require('sanitizer');

//displays all
router.get('/', function(req, res, next) {
    res.render('index', {fullList: urls.getList()});
});

router.get('/:id', function(req, res, next) {

    var id = Number(req.params['id']);
    var output = urls.getLink(id);
    res.redirect(output);
});

router.get('/new/*', function(req, res, next) {
  var url = sanitizer.sanitize(req.url.slice(5));
  var output = urls.newLink(url) - 1;
  res.send('{ "original_url":"' +
    url + '", "short_url":"' + output + '" }');
});


module.exports = router;
