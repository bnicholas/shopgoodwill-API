var cheerio = require('cheerio');
var request = require('request');
var tidy    = require('htmltidy').tidy;
var fs      = require('fs');
var moment  = require('moment');


exports.searchAuctions = function(req, res){
  var tidyPage;
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
  
  var scrapeItems = function(html) {
    var auctionsArray = [];
    
    // console.log("Parsing Markup");
    
    var $ = cheerio.load(html);
    
    // get a cheerio object array of the table rows
    var itemRows = $('table.productresults tbody').first().children('tr');

    // console.log(itemRows.length);

    // iterate over rows and pull out available data
    if (itemRows.length < 1) {
      res.send(204, { error: "looks like this isn't a real page. I mean don't get me wrong. It's there, but there's no table on the page." });
    } else {
      // console.log("Extracting Data");
      itemRows.each(function(i, el){
        var auction = {};
        var itemTH = $(el).children('th');
        // the unique auction number
        auction.itemNumber = itemTH.eq(0).html().trim();
        // console.log(auction.itemNumber);
        // the auction name
        // console.log(auction.itemNumber);
        auction.itemName = itemTH.eq(1).children('a').html();
        // remove any line breaks from auction name
        auction.itemName = auction.itemName.replace(/(\r\n|\n|\r)/gm,"");
        // the auction show url
        // console.log(auction.itemName);
        auction.itemURL = itemTH.eq(1).children('a').attr('href');
        // the small thumbnail
        // console.log(auction.itemURL);
        auction.itemImage = itemTH.eq(1).children('img').attr('src');
        // the Larger image URL
        auction.itemImage = auction.itemImage.replace("-thumb","");
        // the Current price
        // console.log(auction.itemImage);
        auction.itemPrice = itemTH.eq(2).find('b').html();
        // strip out the $ so it validates as a number
        auction.itemPrice = auction.itemPrice.replace("$","");
        // console.log(auction.itemPrice);
        // the number of bids
        auction.itemBids = itemTH.eq(3).html();
        // console.log(auction.itemBids);
        // the end time in words ... useless
        auction.itemEnd = itemTH.eq(4).html();
        // auction.itemEnd = Date.parse(auction.itemEnd);
        auction.itemEnd = moment(auction.itemEnd, 'M/D/YYYY h:m:s a').fromNow();
        // console.log(auction.itemEnd);
        auctionsArray.push(auction);
        // auctionsArray.push(auction);
      });
      var auctionsJson = JSON.stringify(auctionsArray);
      res.jsonp(auctionsArray);      
    };
  };  
  
  tidyPage = function(body) {
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
  
  console.log("Requesting Auctions");
  
  request(url.full, function(error, response, body) {
    if(error) {
      res.jsonp(error);
    } else {
      // console.log("Dirty HTML received");
      tidyPage(body);
    }
  });

}