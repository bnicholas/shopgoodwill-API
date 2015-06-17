var cheerio = require('cheerio');
var request = require('request');
var tidy    = require('htmltidy').tidy;
var auction;

exports.showAuction = function(req, res){
  console.log(req.query.auction);
  var auction = req.query.auction;
  var url = 'http://www.shopgoodwill.com/viewItem.asp?itemID='+req.query.auction;
  console.log(url);
  request(url, function(error, response, body) {
    if(error) {
      res.jsonp(error);
    } else {
      tidyPage(body);
    }
  });

  var tidyPage = function(body) {
    // console.log("Cleaning Markup");
    tidy(body, function(err, html) {
      auction = {};
      auction.images = [];
      if(err){
        console.log(err);
        res.jsonp(err);
        return;
      }
      else {
        var $ = cheerio.load(html);
        var itemImages = $('#details img');
        itemImages.each(function(i,item){
          var src = item.attribs.src;
          if(src.indexOf('-thumb') != -1) {
            src = src.replace("-thumb","");
            auction.images.push(src);
          }
        });
      }
      return res.jsonp(auction);
      // auction;
    });
  };
  // console.log("Requesting Auction");



}
