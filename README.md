# shopgooderwill

#### feedback

- Gaming Systems & Games ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=33&ending=Items
- Home Audio/Theater ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=182&ending=Items
- TVs ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=180&ending=Items

Computers & Electronics ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=7
  Car Audio ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=366&ending=Items
  Computers ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=30&ending=Items
    Accessories ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=179&ending=Items
    Desktops ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=177&ending=Items
    Laptops ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=176&ending=Items
      Apple Laptops ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=370&ending=Items
    Networking ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=350&ending=Items
    Peripherals ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=178&ending=Items
    Tablets ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=365&ending=Items
  Home Electronics ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=32&ending=Items
  
  Personal Electronics ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=183&ending=Items
    Cell Phones & Accessories (327 items)
    Digital Photo Frames (30 items)
    eBook Readers (64 items)
    GPS Devices (132 items)
    Headphones (111 items)
    MP3/CD Players & Accessories (234 items)
    PDAs (18 items)
    Portable DVD Players (68 items)
    Radios (118 items)
  Vintage Electronics ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=431&ending=Items

Musical Instruments ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=13
  Accessories ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=192&ending=Items
  Brass ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=190&ending=Items
  Electronic ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=191&ending=Items
  Other ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=193&ending=Items
  Percussion ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=188&ending=Items
  Strings ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=187&ending=Items
  Woodwinds ... http://www.shopgoodwill.com/listings/listByCat.asp?catID=189&ending=Items

### the unofficial API for gettin me some JSON

I love shopgoodwill.com ... I just hate browsing the site. So I'm goofing around and making a better way to do just that.

#### /search

defaults to the first page of search results for San Diego and All Categories
http://www.shopgoodwill.com/search/SearchKey.asp?itemTitle=&catid=0&sellerID=12&closed=no&minPrice=&maxPrice=&sortBy=itemEndTime&SortOrder=a&showthumbs=on

##### JSON

    [
    
    { "itemNumber": "16655158",
    
      "itemName": "14k Yellow Gold Necklace Oval Lapiz Pendant",
    
      "itemURL": "http://www.shopgoodwill.com/auctions/14-k-Yellow-Gold-Necklace-Oval-Lapiz-Pendant-16655158.html",
    
      "itemImage": "http://images.shopgoodwill.com/12/5-26-2014/885204426103423ns.jpg",
    
      "itemPrice": "23.00",
    
      "itemBids": "3",
    
      "itemEnd": null
    
    }
    
    ]

#### /options

this will give you Sellers and Categories ... but with a little less brain damage.

##### JSON

    {
    
      "categories": [
    
        { "name": "All Categories", "id": "0" },
    
        { "name": "** Summer Paradise **", "id": "133" },
    
        { "name": "Antiques", "id": "1" }
    
      ],
    
      "sellers": [
    
        { "name": "All Sellers", "id": "all" },
    
        { "name": "AL Mobile", "id": "53" },
    
        { "name": "AZ Tucson", "id": "148" },
    
      ]
    
    }

##### NOTES

heroku config:add PATH=vendor/tidy/bin:vendor/tidy/lib:/usr/bin:/bin

heroku config:add LD_LIBRARY_PATH=vendor/tidy/lib