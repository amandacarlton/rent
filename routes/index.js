var express = require('express');
var router = express.Router();
var unirest = require('unirest');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  unirest.post('http://api-stage.zilpy.com/property/-/'+req.body.pay+'/newreport?addr='+req.body.address+'&ptype='+req.body.type+'&bdr='+req.body.room+'&ba='+req.body.bath+'&sqft='+req.body.feet)
  .end(function (response) {
    console.log(response.body.subjectPropertyUserEntry);
  res.render('info', { info: response.body});
});
});

module.exports = router;
