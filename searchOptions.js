var cheerio = require('cheerio');
var request = require('request');
var tidy = require('htmltidy').tidy;
var searchUrl = "http://www.shopgoodwill.com/search/";

exports.searchOptions = function(req, res){
  var results = {};
  var optionsObj = { categories: [], sellers: [] };
  
  request(searchUrl, function(err, resp, body) {
    if(err) {
      res.send(err);
    } 
    else {
      tidy(body, function(error, html){
        if(error) {
          res.send(error);
        } else {
          getOptions(html);  
        }
      });
    }
  });  
  
  var getOptions = function(html){
    $ = cheerio.load(html);
    var catOptions = $('select#catid').children('option');
    var sellerOptions = $('select#SellerID').children('option');
    
    catOptions.each(function(i, el){
      var catName = $(el).html();
      var catID = $(el).val();
      if(catName.indexOf("&gt;") < 0) {
        optionsObj.categories.push({name : catName, id: catID});  
      };
    });
    
    sellerOptions.each(function(i, el){
      var sellerName = $(el).html();
      sellerName = sellerName.split(" - ");
      sellerName = sellerName.slice(0, 2);
      sellerName = sellerName.join(" ");
      var sellerID = $(el).val();
      optionsObj.sellers.push({name : sellerName, id: sellerID});
    });
    res.send(optionsObj);
  };

};
