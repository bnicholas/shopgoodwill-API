var cheerio = require('cheerio');
var request = require('request');
var tidy = require('htmltidy').tidy;
var searchUrl = "http://www.shopgoodwill.com/search/";

exports.listCategories = function(req, res){
  
  request(searchUrl, function(err, resp, body) {
    if(!err) {
      tidy(body, function(error, html){
        if(!error) {
          getCategories(html);  
        }
      });
    }
  });  
  
  var categoriesArray = [];

  var getCategories = function(html){
    $ = cheerio.load(html);
    var catOptions = $('select#catid').children('option');
    
    catOptions.each(function(i, el){
      var catName = $(el).html();
      var catID = $(el).val();
      if(catName.indexOf("&gt;") < 0) {
        categoriesArray.push({name : catName, id : catID});  
      };
    });
    
    res.jsonp(categoriesArray);

  };

};
