
import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DollarSign, Plus, Filter, Download, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for expenses
const expensesData = [
  {
    id: "1",
    date: "2025-05-01",
    category: "Seeds",
    description: "Maize seeds purchase",
    amount: 2500,
  },
  {
    id: "2",
    date: "2025-05-01",
    category: "Fertilizer",
    description: "NPK fertilizer",
    amount: 3000,
  },
  {
    id: "3",
    date: "2025-04-28",
    category: "Labor",
    description: "Planting workers (3 people)",
    amount: 1500,
  },
  {
    id: "4",
    date: "2025-04-25",
    category: "Pesticide",
    description: "Insecticide for tomatoes",
    amount: 800,
  },
  {
    id: "5",
    date: "2025-04-20",
    category: "Transport",
    description: "Transport to market",
    amount: 1200,
  },
];

// Mock data for income
const incomeData = [
  {
    id: "1",
    date: "2025-05-01",
    category: "Sales",
    description: "Tomatoes (50kg)",
    amount: 4500,
  },
  {
    id: "2",
    date: "2025-04-28",
    category: "Sales",
    description: "Potatoes (100kg)",
    amount: 7000,
  },
  {
    id: "3",
    date: "2025-04-20",
    category: "Other",
    description: "Farm consultation fee",
    amount: 2000,
  },
];

export default function AgriTrack() {
  const [view, setView] = useState<"list" | "summary">("list");
  const [activeTab, setActiveTab] = useState("expenses");
  const [period, setPeriod] = useState("all");

  // Calculate totals
  const totalExpenses = expensesData.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  const getPeriodLabel = () => {
    switch (period) {
      case "today": return "Today";
      case "week": return "This Week";
      case "month": return "This Month";
      case "year": return "This Year";
      default: return "All Time";
    }
  };

  return (
    <PageLayout title="AgriTrack" subtitle="Track and manage your farm finances">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex space-x-2">
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
          >
            List View
          </Button>
          <Button
            variant={view === "summary" ? "default" : "outline"}
            onClick={() => setView("summary")}
          >
            Summary
          </Button>
        </div>
        <div className="flex space-x-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link to="/agritrack/add">
              <Plus className="mr-1 h-4 w-4" /> Add Entry
            </Link>
          </Button>
        </div>
      </div>

      {view === "summary" && (
        <div className="grid gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary - {getPeriodLabel()}</CardTitle>
              <CardDescription>Overview of your farm finances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                  <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-500">Ksh {totalExpenses.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-green-50 p-4 border border-green-100">
                  <p className="text-sm font-medium text-gray-500">Total Income</p>
                  <p className="text-2xl font-bold text-green-500">Ksh {totalIncome.toLocaleString()}</p>
                </div>
                <div className={`rounded-lg p-4 border ${
                  netProfit >= 0 ? "bg-primary-light bg-opacity-20 border-primary-light" : "bg-red-50 border-red-100"
                }`}>
                  <p className="text-sm font-medium text-gray-500">Net Profit</p>
                  <p className={`text-2xl font-bold ${
                    netProfit >= 0 ? "text-primary" : "text-red-500"
                  }`}>
                    Ksh {netProfit.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Placeholder for chart */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center border">
                <p className="text-gray-400">Expense and income visualization would be shown here</p>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Top Expense Categories</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Fertilizer</span>
                      <span className="font-medium">Ksh 3,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Seeds</span>
                      <span className="font-medium">Ksh 2,500</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Transport</span>
                      <span className="font-medium">Ksh 1,200</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{ width: "16%" }}></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Income Sources</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Potatoes</span>
                      <span className="font-medium">Ksh 7,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tomatoes</span>
                      <span className="font-medium">Ksh 4,500</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Other</span>
                      <span className="font-medium">Ksh 2,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {view === "list" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Transactions - {getPeriodLabel()}</CardTitle>
            <CardDescription>View and manage your farm transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                </TabsList>
              
                <div className="mt-0">
                  {activeTab === "expenses" && (
                    <TabsContent value="expenses">
                      <div className="overflow-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-3 px-2 text-left font-medium text-gray-500 text-sm">Date</th>
                              <th className="py-3 px-2 text-left font-medium text-gray-500 text-sm">Category</th>
                              <th className="py-3 px-2 text-left font-medium text-gray-500 text-sm">Description</th>
                              <th className="py-3 px-2 text-right font-medium text-gray-500 text-sm">Amount (Ksh)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {expensesData.map((item) => (
                              <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-2">{new Date(item.date).toLocaleDateString()}</td>
                                <td className="py-3 px-2">
                                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                    {item.category}
                                  </span>
                                </td>
                                <td className="py-3 px-2">{item.description}</td>
                                <td className="py-3 px-2 text-right font-medium text-red-500">
                                  {item.amount.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50 font-medium">
                              <td colSpan={3} className="py-3 px-2 text-right">Total Expenses</td>
                              <td className="py-3 px-2 text-right text-red-500">
                                {totalExpenses.toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  )}
                  
                  {activeTab === "income" && (
                    <TabsContent value="income">
                      <div className="overflow-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-3 px-2 text-left font-medium text-gray-500 text-sm">Date</th>
                              <th className="py-3 px-2 text-left font-medium text-gray-500 text-sm">Category</th>
                              <th className="py-3 px-2 text-left font-medium text-gray-500 text-sm">Description</th>
                              <th className="py-3 px-2 text-right font-medium text-gray-500 text-sm">Amount (Ksh)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {incomeData.map((item) => (
                              <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-2">{new Date(item.date).toLocaleDateString()}</td>
                                <td className="py-3 px-2">
                                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    {item.category}
                                  </span>
                                </td>
                                <td className="py-3 px-2">{item.description}</td>
                                <td className="py-3 px-2 text-right font-medium text-green-500">
                                  {item.amount.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50 font-medium">
                              <td colSpan={3} className="py-3 px-2 text-right">Total Income</td>
                              <td className="py-3 px-2 text-right text-green-500">
                                {totalIncome.toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  )}
                </div>
              </Tabs>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    type="search" 
                    placeholder="Search..." 
                    className="pl-9 w-full sm:w-auto" 
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
}
