var cheerio = require('cheerio');
var request = require('request');
var tidy    = require('htmltidy').tidy;

exports.listFavorites = function(req, res){
  // !!! I LOST MY GROOVE MO FO BOTHERING ME !!!
  var favorites = req.query.auctions;
  var favoritesArray = favorites.split(',');
  var auctionsArray = [];
  // http://www.shopgoodwill.com/listings/listByCat.asp?catID=339&ending=EndingToday
  // http://www.shopgoodwill.com/viewItem.asp?itemID=16775635
  favoritesArray.forEach(function(i, e){
    var url = 'http://www.shopgoodwill.com/viewItem.asp?itemID='+e;
    var counter = e+1;
    request(url, function(error, response, body) {
      if(error) {
        res.jsonp(error);
      } else {
        tidyPage(body, counter);
      }
    });
  });
  
  var tidyPage = function(body, counter) {
    // console.log("Cleaning Markup");
    tidy(body, function(err, html) {
      var auction = {};
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
        auctionsArray.push(auction);
        if(counter == favoritesArray.length) {
          console.log(auctionsArray);
        }
      }
      // console.log(auctionsArray);
      // return auctionsArray;
    });
  };
  

  // console.log("Requesting Auctions");
  res.jsonp(favorites); 
  

}