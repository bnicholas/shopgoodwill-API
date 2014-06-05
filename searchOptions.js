var cheerio = require('cheerio');
var request = require('request');

var searchUrl = "http://www.shopgoodwill.com/search/";

exports.searchOptions = function(req, res){
  var results = {};
  
  var optionsObj = { categories: [], sellers: [] };
  
  request(searchUrl, function(err, resp, body) {
    tidy(body, function(error, html){
      if(error) {
        console.log(error);
      } else {
        getOptions(html);
      }
    });
  });
  
  var getOptions = function(html){
    $ = cheerio.load(html);
    var catOptions = $('select#catid').children('option');
    var sellerOptions = $('select#SellerID').children('option');
    catOptions.each(function(i, el){
      var catName = $(el).html();
      var catID = $(el).val();
      optionsObj.categories.push({name : catName, id: catID});
    });
    sellerOptions.each(function(i, el){
      var sellerName = $(el).html();
      var sellerID = $(el).val();
      optionsObj.sellers.push({name : sellerName, id: sellerID});
    });
    res.send(optionsObj);
  };

  
};
