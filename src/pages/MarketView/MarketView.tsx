import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowUpDown, 
  ChevronDown, 
  Download, 
  Search, 
  TrendingUp, 
  Filter,
  Plus,
  Star,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Check,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";

// Mock data for commodity prices
const commodityPrices = [
  { id: 1, name: "Tomatoes", unit: "Crate", price: "2,800", change: "+5%", markets: "4 Markets" },
  { id: 2, name: "Maize", unit: "90kg Bag", price: "3,200", change: "+2%", markets: "6 Markets" },
  { id: 3, name: "Onions", unit: "Net", price: "1,500", change: "+8%", markets: "5 Markets" },
  { id: 4, name: "Potatoes", unit: "110kg Bag", price: "2,200", change: "0%", markets: "3 Markets" },
  { id: 5, name: "Cabbage", unit: "Piece", price: "40", change: "+5%", markets: "4 Markets" },
];

// Mock data for market news
const marketNews = [
  {
    id: 1,
    title: "Global wheat prices rise amid supply concerns",
    date: "May 2, 2025",
    snippet: "Wheat prices have risen by 3% this week as adverse weather conditions in major producing regions raise concerns about supply."
  },
  {
    id: 2,
    title: "Corn exports exceed expectations in Q1 2025",
    date: "May 1, 2025",
    snippet: "Corn exports were 15% higher than expected in the first quarter, according to the latest industry report."
  },
  {
    id: 3,
    title: "Soybean futures rally on increased demand from China",
    date: "April 30, 2025",
    snippet: "Soybean futures have rallied this week following news of increased purchase commitments from Chinese buyers."
  },
];

// Mock data for market price trends
const priceTrendData = {
  corn: [4.82, 4.91, 5.05, 5.12, 5.23],
  wheat: [7.95, 7.91, 7.82, 7.89, 7.86],
  soybeans: [11.92, 12.09, 12.15, 12.21, 12.47]
};

// Mock data for marketplace listings
const marketplaceListings = [
  {
    id: 1,
    title: "Premium Quality Maize - Direct from Farm",
    seller: "Green Valley Farms",
    location: "Central Province",
    price: "$3.50/kg",
    quantity: "5000 kg",
    listed: "April 30, 2025",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 12
  },
  {
    id: 2,
    title: "Organic Tomatoes - Fresh Harvest",
    seller: "Sunshine Produce",
    location: "Western Region",
    price: "$2.75/kg",
    quantity: "1000 kg",
    listed: "May 1, 2025",
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 8
  },
  {
    id: 3,
    title: "Potatoes - Bulk Purchase Available",
    seller: "Highland Crops",
    location: "Eastern Region",
    price: "$1.20/kg",
    quantity: "10000 kg",
    listed: "May 2, 2025",
    image: "/placeholder.svg",
    rating: 4.2,
    reviews: 15
  },
  {
    id: 4,
    title: "Red Onions - Wholesale Only",
    seller: "Valley Fresh",
    location: "Northern Region",
    price: "$1.80/kg",
    quantity: "2500 kg",
    listed: "April 29, 2025",
    image: "/placeholder.svg",
    rating: 4.0,
    reviews: 6
  },
];

// Mock data for my listings
const myListings = [
  {
    id: 101,
    title: "Tomatoes (Grade A)",
    price: "2,600 / crate",
    quantity: "8 crates",
    listedDate: "Apr 30, 2025",
    status: "active",
    views: 24,
    inquiries: 2,
    image: "/placeholder.svg"
  },
  {
    id: 102,
    title: "Cabbage (Medium)",
    price: "35 / piece",
    quantity: "50 pieces",
    listedDate: "Apr 28, 2025",
    status: "active",
    views: 18,
    inquiries: 3,
    image: "/placeholder.svg"
  },
  {
    id: 103,
    title: "Organic Beans - Premium Grade",
    price: "4.25/kg",
    quantity: "350 kg",
    listedDate: "Apr 10, 2025",
    status: "sold",
    views: 98,
    inquiries: 7,
    image: "/placeholder.svg"
  }
];

// Mock data for nearby markets
const nearbyMarkets = [
  { id: 1, name: "Wakulima Market", distance: "5 km away" },
  { id: 2, name: "Gikomba Market", distance: "8 km away" },
  { id: 3, name: "City Market", distance: "12 km away" },
];

// Available regions for filtering
const regions = [
  "All Regions",
  "Central Province",
  "Western Region",
  "Eastern Region",
  "Northern Region",
  "Southern Province",
  "Coastal Region",
  "Nairobi Region"
];

const MarketView = () => {
  const [activeTab, setActiveTab] = useState("prices");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Nairobi Region");
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<number | null>(null);
  const [newListing, setNewListing] = useState({
    title: "",
    price: "",
    quantity: "",
    description: "",
    region: "Central Province",
    category: "grains"
  });

  const filteredCommodities = commodityPrices.filter(commodity => 
    commodity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMarketplace = marketplaceListings.filter(listing => 
    (listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     listing.seller.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedRegion === "All Regions" || listing.location === selectedRegion)
  );

  const handleCreateListing = () => {
    // Validate listing data
    if (!newListing.title || !newListing.price || !newListing.quantity) {
      toast("Missing information", {
        description: "Please fill in all required fields",
        style: { backgroundColor: "red", color: "white" }
      });
      return;
    }

    // Close dialog and show success toast
    setIsAddListingOpen(false);
    toast("Listing Created", {
      description: "Your product has been successfully listed in the marketplace",
    });

    // Reset form
    setNewListing({
      title: "",
      price: "",
      quantity: "",
      description: "",
      region: "Central Province",
      category: "grains"
    });

    // Switch to My Listings tab
    setActiveTab("mylistings");
  };

  const toggleListingStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast(`Listing ${newStatus === "active" ? "Activated" : "Deactivated"}`, {
      description: `The listing has been ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
    });
  };

  const handleViewListingDetails = (id: number) => {
    setSelectedListing(id);
  };

  const handleCloseListingDetails = () => {
    setSelectedListing(null);
  };

  return (
    <PageLayout
      title="MarketView"
      subtitle="Track commodity prices and market trends for better decision making"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search commodities or listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        <Tabs defaultValue="prices" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="prices">Current Prices</TabsTrigger>
            <TabsTrigger value="news">Market News</TabsTrigger>
            <TabsTrigger value="trends">Price Trends</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="mylistings">My Listings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prices" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Current Market Prices</CardTitle>
                <CardDescription>
                  Average prices from markets in {selectedRegion}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                          <span>Crop</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                          <span>Price (Ksh)</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Markets</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCommodities.length > 0 ? (
                      filteredCommodities.map((commodity) => (
                        <TableRow key={commodity.id}>
                          <TableCell className="font-medium">{commodity.name}</TableCell>
                          <TableCell>{commodity.unit}</TableCell>
                          <TableCell>{commodity.price}</TableCell>
                          <TableCell className={commodity.change.includes("-") ? "text-red-600" : commodity.change === "0%" ? "text-gray-600" : "text-green-600"}>
                            {commodity.change}
                          </TableCell>
                          <TableCell>{commodity.markets}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">No commodities found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Last updated: May 2, 2025
                </p>
                <Button variant="ghost" size="sm">
                  View Price History
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Price Trends</CardTitle>
                  <CardDescription>Price changes over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {commodityPrices.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <Badge 
                        variant="outline" 
                        className={
                          item.change.includes("-") ? "bg-red-100 text-red-800" : 
                          item.change === "0%" ? "bg-gray-100 text-gray-800" : 
                          "bg-green-100 text-green-800"
                        }
                      >
                        {item.change}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Markets Near You</CardTitle>
                  <CardDescription>Popular markets in your region</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nearbyMarkets.map((market) => (
                    <div key={market.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{market.name}</p>
                          <p className="text-xs text-muted-foreground">{market.distance}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full mt-2">View All Markets</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Market Outlook</CardTitle>
                  <CardDescription>Forecast for the coming week</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Prices for tomatoes and onions expected to rise due to transportation challenges. Maize prices projected to remain stable with adequate supply.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          
          <TabsContent value="news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market News & Updates</CardTitle>
                <CardDescription>
                  Latest agricultural market news and insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketNews.map(news => (
                  <div key={news.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{news.title}</h3>
                      <span className="text-sm text-muted-foreground">{news.date}</span>
                    </div>
                    <p className="text-sm">{news.snippet}</p>
                    <Button variant="link" className="px-0">Read more</Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All News
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Price Trends</CardTitle>
                <CardDescription>
                  5-day price trends for major commodities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Corn</h3>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+8.5%</span>
                    </div>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {priceTrendData.corn.map((price, index) => (
                      <div 
                        key={index}
                        className="bg-primary flex-1 rounded-t" 
                        style={{ height: `${(price/5.5)*100}%` }}
                        title={`$${price}`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Apr 28</span>
                    <span>May 2</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Wheat</h3>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                      <span className="text-sm text-red-600">-1.1%</span>
                    </div>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {priceTrendData.wheat.map((price, index) => (
                      <div 
                        key={index}
                        className="bg-secondary flex-1 rounded-t" 
                        style={{ height: `${(price/8.5)*100}%` }}
                        title={`$${price}`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Apr 28</span>
                    <span>May 2</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Soybeans</h3>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+4.6%</span>
                    </div>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {priceTrendData.soybeans.map((price, index) => (
                      <div 
                        key={index}
                        className="bg-accent flex-1 rounded-t" 
                        style={{ height: `${(price/13)*100}%` }}
                        title={`$${price}`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Apr 28</span>
                    <span>May 2</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Charts
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="marketplace" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Farm Marketplace</CardTitle>
                    <CardDescription>
                      Buy directly from farmers or sell your produce
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map(region => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Dialog open={isAddListingOpen} onOpenChange={setIsAddListingOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-1 h-4 w-4" /> New Listing
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Create New Listing</DialogTitle>
                          <DialogDescription>
                            List your agricultural products for sale in the marketplace
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Product Title</Label>
                            <Input 
                              id="title" 
                              placeholder="e.g., Fresh Tomatoes - Organic" 
                              value={newListing.title}
                              onChange={e => setNewListing({...newListing, title: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="price">Price per Unit</Label>
                              <Input 
                                id="price" 
                                placeholder="e.g., 2,500/crate" 
                                value={newListing.price}
                                onChange={e => setNewListing({...newListing, price: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quantity">Available Quantity</Label>
                              <Input 
                                id="quantity" 
                                placeholder="e.g., 10 crates" 
                                value={newListing.quantity}
                                onChange={e => setNewListing({...newListing, quantity: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="category">Category</Label>
                              <Select 
                                value={newListing.category} 
                                onValueChange={value => setNewListing({...newListing, category: value})}
                              >
                                <SelectTrigger id="category">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fruits">Fruits</SelectItem>
                                  <SelectItem value="vegetables">Vegetables</SelectItem>
                                  <SelectItem value="grains">Grains & Cereals</SelectItem>
                                  <SelectItem value="dairy">Dairy</SelectItem>
                                  <SelectItem value="livestock">Livestock</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="region">Region</Label>
                              <Select 
                                value={newListing.region} 
                                onValueChange={value => setNewListing({...newListing, region: value})}
                              >
                                <SelectTrigger id="region">
                                  <SelectValue placeholder="Select region" />
                                </SelectTrigger>
                                <SelectContent>
                                  {regions.filter(r => r !== "All Regions").map(region => (
                                    <SelectItem key={region} value={region}>
                                      {region}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                              id="description" 
                              placeholder="Provide details about your product..." 
                              className="min-h-[100px]"
                              value={newListing.description}
                              onChange={e => setNewListing({...newListing, description: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="image">Product Image</Label>
                            <Input id="image" type="file" />
                            <p className="text-xs text-muted-foreground">Upload a clear image of your product (max 5MB)</p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddListingOpen(false)}>Cancel</Button>
                          <Button onClick={handleCreateListing}>Create Listing</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMarketplace.length > 0 ? (
                    filteredMarketplace.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted relative">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="object-cover w-full h-full"
                          />
                          <Badge className="absolute top-2 right-2 bg-background/80">{listing.quantity}</Badge>
                        </div>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">{listing.title}</CardTitle>
                          <div className="flex justify-between items-center">
                            <CardDescription>{listing.seller}</CardDescription>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{listing.rating}</span>
                              <span className="text-xs text-muted-foreground">({listing.reviews})</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-primary">{listing.price}</span>
                            <span className="text-muted-foreground">{listing.location}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Listed: {listing.listed}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full">Contact Seller</Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-muted-foreground">No listings found matching your criteria</p>
                    </div>
                  )}
                </div>
                {filteredMarketplace.length > 0 && (
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">Load More</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mylistings" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Active Listings</CardTitle>
                    <CardDescription>
                      Manage your products for sale
                    </CardDescription>
                  </div>
                  <Dialog open={isAddListingOpen} onOpenChange={setIsAddListingOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-1 h-4 w-4" /> Add New Listing
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price (Ksh)</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Listed On</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myListings.filter(l => l.status !== "sold").map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-muted rounded overflow-hidden">
                              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                            </div>
                            <span>{listing.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{listing.price}</TableCell>
                        <TableCell>{listing.quantity}</TableCell>
                        <TableCell>{listing.listedDate}</TableCell>
                        <TableCell>{listing.views}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewListingDetails(listing.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {myListings.filter(l => l.status !== "sold").length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          <p className="text-muted-foreground">You don't have any active listings</p>
                          <Button onClick={() => setIsAddListingOpen(true)} variant="outline" className="mt-2">
                            <Plus className="mr-1 h-4 w-4" /> Create Your First Listing
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                
                <Dialog open={selectedListing !== null} onOpenChange={handleCloseListingDetails}>
                  {selectedListing !== null && (
                    <>
                      <DialogHeader>
                        <DialogTitle>{myListings.find(l => l.id === selectedListing)?.title}</DialogTitle>
                        <DialogDescription>
                          Listing details and performance
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                          <img
                            src={myListings.find(l => l.id === selectedListing)?.image}
                            alt={myListings.find(l => l.id === selectedListing)?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                            <p>{myListings.find(l => l.id === selectedListing)?.price}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
                            <p>{myListings.find(l => l.id === selectedListing)?.quantity}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Listed On</h3>
                            <p>{myListings.find(l => l.id === selectedListing)?.listedDate}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                            <Badge variant="outline" className="mt-1">
                              {myListings.find(l => l.id === selectedListing)?.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default MarketView;
