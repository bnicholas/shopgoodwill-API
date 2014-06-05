var cheerio = require('cheerio');
var request = require('request');
var tidy = require('htmltidy').tidy;

exports.searchAuctions = function(req, res){
  var tidyPage;
  var queryCat = 7;
  var querySeller = 12;
  var queryPage = 1;

  if(req.query.page) {
    queryPage = req.query.page;
  };

  if(req.query.cat) {
    queryCat = req.query.cat;
  };

  if(req.query.seller) {
    querySeller = req.query.seller;
  };
  
  var url = {
    base:   'http://www.shopgoodwill.com/search/searchKey.asp?showthumbs=on&sortBy=itemEndTime&closed=no&SortOrder=a&sortBy=itemEndTime&',
    page:   queryPage,
    seller: querySeller,
    cat:    queryCat,
    title:  '',
    min:    null,
    max:    null,
    get full () {
      return this.base+'itemTitle='+this.title+'&catid='+this.cat+'&sellerID='+this.seller+'&page='+this.page;
    }  
  }
  
  var scrapeItems = function(clean) {
    var auctionsArray = [];
    
    console.log('scrapeItems');
    
    var $ = cheerio.load(clean);
    
    // get a cheerio object array of the table rows
    var itemRows = $('table.productresults tbody').first().children('tr');

    // iterate over rows and pull out available data
    if(itemRows.length > 1) {
      itemRows.each(function(i, el){
        var auction = {};
        var itemTH = $(el).children('th');
        // the unique auction number
        auction.itemNumber = itemTH.eq(0).html().trim();
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
        auction.itemEnd = itemTH.eq(4).find('font').html();
        // console.log(auction.itemEnd);
        auctionsArray.push(auction);
        // auctionsArray.push(auction);
      });
      res.send(auctionsArray);
    } else {
      res.send(clean);
    }
  };  
  
  // tidyPage = function(body) {
  //   tidy(body, function(err, markup) {
  //       if(err){ 
  //         console.log(err); 
  //         return; 
  //       } else { 
  //         console.log("yay!");
  //         res.send("WOW");
  //       }
  //     });
  //   }
  // };

  request(url.full, function(error, response, body) {
    if(!error) {
      
      tidy('<div>hello</div>', function(err, html) {
        console.log(html);
      });
    
    };
  });

};