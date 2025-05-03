
import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const SubscriptionPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<"free" | "premium" | "enterprise">("premium");
  
  const handleChangePlan = (plan: "free" | "premium" | "enterprise") => {
    if (plan === currentPlan) return;
    
    toast({
      title: "Subscription Update",
      description: `Your plan has been changed to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
    });
    
    setCurrentPlan(plan);
  };
  
  const handleCancelSubscription = () => {
    toast({
      title: "Subscription Cancellation",
      description: "Your subscription will remain active until the end of your billing period",
    });
    
    setCurrentPlan("free");
  };
  
  const plans = [
    {
      name: "Free",
      id: "free",
      price: isAnnual ? "Free" : "Free",
      description: "Basic farm management tools",
      features: [
        "Farm calendar",
        "Basic crop tracking",
        "Market price notifications",
        "Limited AI assistance"
      ]
    },
    {
      name: "Premium",
      id: "premium",
      price: isAnnual ? "$99.99/year" : "$9.99/month",
      savings: isAnnual ? "Save $19.89" : null,
      description: "Advanced tools for serious farmers",
      features: [
        "All Free features",
        "Advanced crop and livestock tracking",
        "Full AgriCoach AI assistance",
        "Expert consultations (2/month)",
        "Detailed market analysis",
        "Unlimited marketplace listings"
      ]
    },
    {
      name: "Enterprise",
      id: "enterprise",
      price: isAnnual ? "$299.99/year" : "$29.99/month",
      savings: isAnnual ? "Save $59.89" : null,
      description: "Complete solution for large farms",
      features: [
        "All Premium features",
        "Multiple farm management",
        "Advanced reporting & analytics",
        "Priority expert access",
        "Custom integrations",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <PageLayout title="Subscription" subtitle="Manage your subscription plan and billing">
      <div className="space-y-6">
        {/* Current Subscription Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>Your current subscription plan and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{plans.find(p => p.id === currentPlan)?.name} Plan</h3>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  {isAnnual ? "Annual billing" : "Monthly billing"} • 
                  Next payment on {isAnnual ? "May 3, 2026" : "June 3, 2025"}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-end gap-2">
                  <Label htmlFor="billing-cycle">Monthly</Label>
                  <Switch 
                    id="billing-cycle" 
                    checked={isAnnual} 
                    onCheckedChange={setIsAnnual} 
                  />
                  <Label htmlFor="billing-cycle" className="flex items-center gap-1">
                    Annual
                    <span className="text-xs bg-primary/10 text-primary px-1 py-0.5 rounded">Save 15%</span>
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Payment Method</h4>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-sm font-bold">VISA</span>
                </div>
                <div>
                  <p className="text-sm">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/26</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center border-t pt-4">
            <Button variant="outline" className="flex-1" onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
            <Button className="flex-1" onClick={() => handleChangePlan(currentPlan === "premium" ? "enterprise" : "premium")}>
              {currentPlan === "free" ? "Upgrade Plan" : 
               currentPlan === "premium" ? "Upgrade to Enterprise" : "Downgrade to Premium"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`border-2 ${currentPlan === plan.id ? 'border-primary' : 'border-border'}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                    {currentPlan === plan.id && (
                      <Badge variant="outline" className="bg-primary/10 text-primary">Current</Badge>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.savings && (
                      <span className="ml-2 text-green-600 text-sm font-medium">{plan.savings}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {currentPlan === plan.id ? (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      variant={plan.id === "free" ? "outline" : "default"}
                      onClick={() => handleChangePlan(plan.id as "free" | "premium" | "enterprise")}
                    >
                      {plan.id === "free" 
                        ? "Downgrade to Free" 
                        : plan.id === "premium" && currentPlan === "enterprise"
                          ? "Downgrade to Premium"
                          : `Upgrade to ${plan.name}`
                      }
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View your payment history and download invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Premium Plan - {isAnnual ? "Annual" : "Monthly"}</p>
                  <p className="text-sm text-muted-foreground">May 3, 2025</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <p className="font-medium">{isAnnual ? "$99.99" : "$9.99"}</p>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Premium Plan - {isAnnual ? "Annual" : "Monthly"}</p>
                  <p className="text-sm text-muted-foreground">April 3, 2025</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <p className="font-medium">{isAnnual ? "$99.99" : "$9.99"}</p>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Premium Plan - {isAnnual ? "Annual" : "Monthly"}</p>
                  <p className="text-sm text-muted-foreground">March 3, 2025</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <p className="font-medium">{isAnnual ? "$99.99" : "$9.99"}</p>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Transactions</Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SubscriptionPage;
