# shopgooderwill
### the unofficial API for gettin me some JSON

I love shopgoodwill.com ... I just hate browsing the site. So I'm goofing around and making a better way to do just that.

#### /search

defaults to the first page of search results for San Diego and All Categories
http://www.shopgoodwill.com/search/SearchKey.asp?itemTitle=&catid=0&sellerID=12&closed=no&minPrice=&maxPrice=&sortBy=itemEndTime&SortOrder=a&showthumbs=on

##### JSON

<[
{ "itemNumber": "16655158",
  "itemName": "14k Yellow Gold Necklace Oval Lapiz Pendant",
  "itemURL": "http://www.shopgoodwill.com/auctions/14-k-Yellow-Gold-Necklace-Oval-Lapiz-Pendant-16655158.html",
  "itemImage": "http://images.shopgoodwill.com/12/5-26-2014/885204426103423ns.jpg",
  "itemPrice": "23.00",
  "itemBids": "3",
  "itemEnd": null
}
]>

#### /options

this will give you Sellers and Categories ... but with a little less brain damage.

##### JSON

<{
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
}>