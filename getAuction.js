var cheerio = require('cheerio');
var request = require('request');
var tidy    = require('htmltidy').tidy;

exports.getAuction = function(req, res){
  var tidyPage;
  // http://www.shopgoodwill.com/listings/listByCat.asp?catID=339&ending=EndingToday
  // http://www.shopgoodwill.com/viewItem.asp?itemID=16775635
  
  
  // var auctions = req.query.auctions;
  // querystring.parse('foo=bar&baz=qux&baz=quux&corge')
  // returns
  // { foo: 'bar', baz: ['qux', 'quux'], corge: '' }

  var auctions = [16775635];

  var auctionsArray = [];

  auctions.forEach(function(e){
    var url = 'http://www.shopgoodwill.com/viewItem.asp?itemID='+this
    request(url, function(error, response, body) {
      if(error) {
        res.jsonp(error);
      } else {
        tidyPage(body);
      }
    });
  });

  var url = "http://www.shopgoodwill.com/viewItem.asp?itemID="+auctionIDs;
    
  
  var scrapeItem = function(html) {
    var $ = cheerio.load(html);
    var itemImages = $('#details').children('a.cboxElement').attr('href');
    
    if (itemImages.length < 1) {
      res.send(204, { error: "looks like this isn't a real page. I mean don't get me wrong. It's there, but there's no table on the page." });
    } else {
      
            
    };
  };  
  
  var tidyPage = function(body) {
    // console.log("Cleaning Markup");
    tidy(body, function(err, html) {
      if(err){  
        res.jsonp(err);
        return; 
      } else { 
        var $ = cheerio.load(html);
        var itemImages = $('#details').children('a.cboxElement').attr('href');
        auctionsArray.push(itemImages);
        return;
      }
    });
  };
  
  console.log("Requesting Auctions");
  
  

}