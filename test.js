var path = require('path');
var Freemarker = require('freemarker.js');
var fm = new Freemarker({
  viewRoot: path.join(__dirname, './template'),
  options: {
    /** for fmpp */
  }
});

// Single template file
fm.render(`a/a.ftl`, {
  "user": "Big Joe",
  "latestProduct": {
    "url": "products/greenmouse.html",
    "name": "green mouse"
  }
}, function (err, html, output) {
  console.log('err:', err, '\n')
  console.log('html:', html, '\n')
  console.log('output:', output, '\n')
});

Freemarker.exec(['--version'], function (err, output) {
  //
  console.log(output)
});