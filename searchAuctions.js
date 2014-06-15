var cheerio   = require('cheerio');
var request   = require('request');
var tidy      = require('htmltidy').tidy;
var fs        = require('fs');
var moment    = require('moment');
var sizeOf    = require('image-size');
var url       = require('url');
var http      = require('http');
var imagesize = require('imagesize');


// var dimesions = sizeOf('images/funny-cats.png');


exports.searchAuctions = function(req, res){
  var auctionsArray = [];
  var queryCat = 0;
  var querySeller = "all";
  var queryPage = 1;
  var queryTerm = "";

  if(req.query.page) {
    queryPage = req.query.page;
  };
  if(req.query.cat) { 
    queryCat = req.query.cat;
  };
  if(req.query.seller) {
    querySeller = req.query.seller;
  };
  if(req.query.term) {
    queryTerm = req.query.term;
  };

  var url = {
    base:   'http://www.shopgoodwill.com/search/searchKey.asp?showthumbs=on&sortBy=itemEndTime&closed=no&SortOrder=a&sortBy=itemEndTime&',
    page:   queryPage,
    seller: querySeller,
    cat:    queryCat,
    title:  queryTerm,
    min:    null,
    max:    null,
    get full () {
      return this.base+'itemTitle='+this.title+'&catid='+this.cat+'&sellerID='+this.seller+'&page='+this.page;
    }  
  };
  
  var setImgSize = function(imgSrc) {
    sizeOf(auction.itemImage, function (err, dimensions) {
      return dimensions;
      // auction.itemH = dimensions.height;
      // auction.itemW = dimensions.width;
      // auctionsArray.push(auction);
      // console.log(dimensions.width, dimensions.height);
    });
  }

  var scrapeItems = function(html) {
    
    // console.log("Parsing Markup");
    
    var $ = cheerio.load(html);
    
    // get a cheerio object array of the table rows
    var itemRows = $('table.productresults tbody').first().children('tr');

    // console.log(itemRows.length);

    // iterate over rows and pull out available data
    if (itemRows.length < 1) {
      res.send(204, { error: "looks like this isn't a real page. I mean don't get me wrong. It's there, but there's no table on the page." });
    } 
    else {
      // console.log("Extracting Data");
      itemRows.each(function(i, el) {
        var auction = {};
        var itemTH = $(el).children('th');
        auction.itemNumber = itemTH.eq(0).html().trim();
        auction.itemName = itemTH.eq(1).children('a').html();
        auction.itemName = auction.itemName.replace(/(\r\n|\n|\r)/gm,"");
        auction.itemURL = itemTH.eq(1).children('a').attr('href');
        auction.itemImage = itemTH.eq(1).children('img').attr('src');
        auction.itemImage = auction.itemImage.replace("-thumb","");
        auction.itemPrice = itemTH.eq(2).find('b').html();
        auction.itemPrice = auction.itemPrice.replace("$","");
        auction.itemBids = itemTH.eq(3).html();
        auction.itemEnd = itemTH.eq(4).html();
        auction.itemEnd = moment(auction.itemEnd, 'M/D/YYYY h:m:s a').fromNow();
        
        var getImage = http.get(auction.itemImage, function (response) {
          imagesize(response, function (err, result) {
            auction.itemH = result.height;
            auction.itemW = result.width;
            auction.imageRatio = result.height/result.width;
            // addAuction(auction, i, itemRows.length);
            getImage.abort();
            auctionsArray.push(auction);
            if(itemRows.length === i+1) {
              sendJSON();  
            };
          }); // end imagesize
        }); // end getImage
      }); // end itemRows.each
    }; // end else
  }; // end scrapeItems
  
  var sendJSON = function() {
    res.jsonp(auctionsArray);
  };

  var tidyPage = function(body) {
    // console.log("Cleaning Markup");
    tidy(body, function(err, html) {
      if(err){  
        res.jsonp(err);
        return; 
      } else { 
        // console.log("Markup Cleaned");
        scrapeItems(html);        
        // fs.writeFile('clean.html', html, function (err) {
        //   if (err) throw err;
        //   console.log('saved clean.html');
        // });
      }
    });
  };
  
  // console.log("Requesting Auctions");
  
  request(url.full, function(error, response, body) {
    if(error) {
      res.jsonp(error);
    } else {
      // console.log("Dirty HTML received");
      tidyPage(body);
    }
  });

}