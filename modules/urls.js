var mongoose = require('mongoose');
var urlDB = require('../models/urlDB');

//adds the passed url to the list and returns the id
function create(fullUrl) {
  urlList.push({url: fullUrl, short: urlList.length.toString()});
  console.log('pushed id: ' + urlList.length.toString() + " for: " + fullUrl);
  return urlList.length.toString();
};

//output a table containing all of the links in urlList array
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


module.exports = {
  newLink: function(fullUrl) {
    return create(fullUrl);
  },
  getLink: function(id) {
    return urlList[id]['url'];
  },
  getList: function(res) {
    getAllHTML(res);

  }
};
