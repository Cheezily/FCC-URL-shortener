var urlDB = require('../models/urlDb');

/*
var urlList = [{url: "http://www.freecodecamp.com", short: "0"},
  {url: "http://www.google.com", short: "1"},
  {url: "http://www.cnn.com", short: "2"},
  {url: "http://www.ebay.com", short: "3"}
  ];
*/

//adds the passed url to the list and returns the id
function create(fullUrl) {
  urlList.push({url: fullUrl, short: urlList.length.toString()});
  console.log('pushed id: ' + urlList.length.toString() + " for: " + fullUrl);
  return urlList.length.toString();
};

//output a table containing all of the links in urlList array
function getAllHTML() {
  var items = 0;
  if (urlList.length < 20) {
    items = 20;
  } else {
    items = urlList.length;
  }

  var output = '<table cellspacing="0"><th>ID</th><th>URL</th>';
  for (var i = 0; i < items; i++) {
    if (i < urlList.length) {
      output += '<tr><td>' + i + '</td><td class="link">' + urlList[i]["url"] + '</td></tr>';
    } else {
      output += '<tr><td class="link">--</td><td>--------------------</td></tr>';
    }
  }
  output += '</table>';
  return output;
}


module.exports = {
  newLink: function(fullUrl) {
    return create(fullUrl);
  },
  getLink: function(id) {
    return urlList[id]['url'];
  },
  getList: function() {
    return getAllHTML();
  }
};
