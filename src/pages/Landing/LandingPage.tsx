
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import YieldQuipLogo from "@/components/YieldQuipLogo";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AgriTrack",
      description: "Track your farm operations and inventory with ease",
      benefits: ["Record harvests and yields", "Monitor crop rotation", "Track livestock performance"]
    },
    {
      title: "Farm Calendar",
      description: "Never miss an important farming activity",
      benefits: ["Schedule important tasks", "Seasonal planning tools", "Weather-aware recommendations"]
    },
    {
      title: "AgriCoach",
      description: "Expert farming advice at your fingertips",
      benefits: ["AI-powered farming assistant", "Connect with agriculture experts", "Get personalized recommendations"]
    },
    {
      title: "MarketView",
      description: "Stay updated with market trends and prices",
      benefits: ["Real-time market data", "Buy and sell farm produce", "Price trend analysis"]
    },
  ];

  const testimonials = [
    {
      quote: "YieldQuip has transformed how I manage my 50-acre farm. The AgriTrack feature alone has increased my productivity by 30%.",
      author: "John Mwangi",
      role: "Crop Farmer, Central Province"
    },
    {
      quote: "The market insights from MarketView helped me sell my produce at the best possible prices. I've seen a 20% increase in profits.",
      author: "Sarah Kamau",
      role: "Vegetable Farmer, Eastern Region"
    },
    {
      quote: "As a new farmer, AgriCoach has been invaluable. The expert advice helped me avoid costly mistakes in my first season.",
      author: "David Ochieng",
      role: "New Farmer, Western Region"
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Farm calendar",
        "Basic crop tracking",
        "Market price notifications",
        "Limited AI assistance"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Premium",
      price: "$9.99/month",
      features: [
        "All Basic features",
        "Advanced crop and livestock tracking",
        "Full AgriCoach AI assistance",
        "Expert consultations (2/month)",
        "Detailed market analysis",
        "Unlimited marketplace listings"
      ],
      cta: "Try Premium",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "$29.99/month",
      features: [
        "All Premium features",
        "Multiple farm management",
        "Advanced reporting & analytics",
        "Priority expert access",
        "Custom integrations",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-foreground to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto flex justify-center mb-6">
            <YieldQuipLogo className="h-16 w-16" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            YieldQuip
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            The all-in-one digital assistant for modern farmers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login?register=true")}>
              Create Account
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Farming Made Smarter</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors duration-300">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" onClick={() => navigate("/login")}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Farmers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 mr-1">★</span>
                    ))}
                  </div>
                  <p className="italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Select the perfect plan for your farming needs, from small homesteads to large agricultural enterprises
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`${plan.highlighted ? 'border-primary shadow-lg relative' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 text-center">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-muted-foreground ml-1">per month</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 min-h-[220px]">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => navigate("/login?register=true")}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of farmers already using YieldQuip to increase yields, save time, and maximize profits
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => navigate("/login")}
            className="mx-auto"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <YieldQuipLogo className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold text-primary">YieldQuip</span>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 YieldQuip. All rights reserved.</p>
            <div className="mt-2 flex justify-center gap-4">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
