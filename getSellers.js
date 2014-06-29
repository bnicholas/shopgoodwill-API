var cheerio = require('cheerio');
var request = require('request');
var tidy = require('htmltidy').tidy;
var searchUrl = "http://www.shopgoodwill.com/search/";

exports.listSellers = function(req, res){
  
  var sellersArray = [];
  
  request(searchUrl, function(err, resp, body) {
    if(!err) {
      tidy(body, function(error, html){
        if(!error) {
          getSellers(html);  
        }
      });
    }
  });  
  
  var getSellers = function(html){
    $ = cheerio.load(html);
    
    var sellerOptions = $('select#SellerID').children('option');
    
    sellerOptions.each(function(i, el){
      var sellerName = $(el).html();
      sellerName = sellerName.split(" - ");
      sellerName = sellerName.slice(0, 2);
      sellerName = sellerName.join(" ");
      var sellerID = $(el).val();
      if(sellerID !== 'all') {
        sellersArray.push({sellerName : sellerName, sellerId : sellerID});
      };
    });
    res.jsonp(sellersArray);

  };

};
