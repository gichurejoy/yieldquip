
import React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AddEntry() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Entry added successfully",
      description: "Your farming activity has been recorded.",
      duration: 3000,
    });
    navigate("/agritrack");
  };

  return (
    <PageLayout title="Add Entry" subtitle="Record a new farming activity">
      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="expense" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expense">Log Expense</TabsTrigger>
            <TabsTrigger value="income">Log Income</TabsTrigger>
          </TabsList>
          <TabsContent value="expense">
            <Card>
              <CardHeader>
                <CardTitle>Record Expense</CardTitle>
                <CardDescription>
                  Track what you spend on your farm
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-date">Date</Label>
                      <Input
                        id="expense-date"
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expense-amount">Amount (Ksh)</Label>
                      <Input
                        id="expense-amount"
                        type="number"
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-category">Category</Label>
                    <Select required>
                      <SelectTrigger id="expense-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seeds">Seeds</SelectItem>
                        <SelectItem value="fertilizer">Fertilizer</SelectItem>
                        <SelectItem value="pesticide">Pesticide</SelectItem>
                        <SelectItem value="labor">Labor</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-description">Description</Label>
                    <Textarea
                      id="expense-description"
                      placeholder="Describe your expense..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-photo">Add Photo (Optional)</Label>
                    <Input id="expense-photo" type="file" accept="image/*" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/agritrack">Cancel</Link>
                  </Button>
                  <Button type="submit">Save Expense</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle>Record Income</CardTitle>
                <CardDescription>
                  Track what you earn from your farm
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="income-date">Date</Label>
                      <Input
                        id="income-date"
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="income-amount">Amount (Ksh)</Label>
                      <Input
                        id="income-amount"
                        type="number"
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income-category">Category</Label>
                    <Select required>
                      <SelectTrigger id="income-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crop-sales">Crop Sales</SelectItem>
                        <SelectItem value="livestock-sales">Livestock Sales</SelectItem>
                        <SelectItem value="services">Farm Services</SelectItem>
                        <SelectItem value="rental">Equipment Rental</SelectItem>
                        <SelectItem value="subsidy">Subsidies</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income-description">Description</Label>
                    <Textarea
                      id="income-description"
                      placeholder="Describe your income..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income-photo">Add Photo (Optional)</Label>
                    <Input id="income-photo" type="file" accept="image/*" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/agritrack">Cancel</Link>
                  </Button>
                  <Button type="submit">Save Income</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
