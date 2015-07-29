var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var eyes = require('eyes');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  unirest.post('http://api-stage.zilpy.com/property/-/'+req.body.pay+'/newreport?addr='+req.body.address+'&ptype='+req.body.type+'&bdr='+req.body.room+'&ba='+req.body.bath+'&sqft='+req.body.feet)
  .end(function (info) {
    console.log(info.body.subjectPropertyUserEntry.address.location.lat);
    unirest.get('https://azure.geodataservice.net/GeoDataService.svc/GetUSDemographics?$format=json&longitude='+info.body.subjectPropertyUserEntry.address.location.lng+'&latitude='+info.body.subjectPropertyUserEntry.address.location.lat+'&includecrimedata=true')
    .end(function (result) {
      console.log(result.body.d[0].MedianAge);
    res.render('info', {info: info.body, res: result.body.d[0]});

     });
});
});







module.exports = router;
