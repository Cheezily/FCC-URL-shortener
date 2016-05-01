var mongoose = require('mongoose');
var path = require('path');
var urlDB = require('./urldb');


//adds the passed url to the list and returns the id
function create(fullUrl, res) {
  urlDB.count(function(err, count) {
    if (err) throw err;
    console.log(count);
    var urlSubmitted = new urlDB({
      "url": fullUrl,
      "short": count.toString()
    });

    urlSubmitted.save(function(err) {
      res.send('{ "original_url":"' +
        fullUrl + '", "short_url":"' + count + '" }');
    })
  })
};


//output a table containing all of the links in urlList array
// "res" needs to be passed since db call is async
function getAllHTML(res) {

  urlDB.find({}, function(err, dbDump) {
    if (err) throw err;

    var items = 0;
    if (dbDump.length < 20) {
      items = 20;
    } else {
      items = dbDump.length;
    }

    var output = '<table cellspacing="0"><th>ID</th><th>URL</th>';
    for (var i = 0; i < items; i++) {
      if (i < dbDump.length) {
        output += '<tr><td>' + i + '</td><td class="link">' + dbDump[i]["url"] + '</td></tr>';
      } else {
        output += '<tr><td class="link">--</td><td>--------------------</td></tr>';
      }
    }
    output += '</table>';

    res.render('index', {fullList: output});
  });
}


function goToLink(id, res) {
  console.log("ID: " + id);
  urlDB.findOne({"short": id.toString()}, function(err, result) {
    if (err) throw err;

    if (result) {
      res.redirect(result.url);
    } else {
      res.end('Invlaid Link.  Please go back and try again.');
    }

  })
}


module.exports = {
  newLink: function(fullUrl, res) {
    create(fullUrl, res);
  },
  getLink: function(id, res) {
    goToLink(id, res);
  },
  getList: function(res) {
    getAllHTML(res);
  }
};
