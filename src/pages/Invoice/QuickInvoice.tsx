
import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoiceList from "@/components/invoice/InvoiceList";
import { toast } from "@/components/ui/sonner";

const QuickInvoice = () => {
  const [activeTab, setActiveTab] = useState("create");
  
  const handleInvoiceCreated = () => {
    toast.success("Invoice created successfully!");
    setActiveTab("manage");
  };

  const handleInvoiceOperation = (operation: string, id: string) => {
    switch (operation) {
      case "print":
        toast.success(`Printing invoice ${id}...`);
        window.print();
        break;
      case "download":
        toast.success(`Invoice ${id} downloaded successfully!`);
        break;
      case "paid":
        toast.success(`Invoice ${id} marked as paid!`);
        break;
      case "export":
        toast.success(`Invoice ${id} exported successfully!`);
        break;
      default:
        break;
    }
  };

  return (
    <PageLayout 
      title="QuickInvoice" 
      subtitle="Create and manage invoices for your agricultural business"
    >
      <div className="space-y-6">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="create">Create Invoice</TabsTrigger>
            <TabsTrigger value="manage">Manage Invoices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <InvoiceForm onInvoiceCreated={handleInvoiceCreated} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="manage" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <InvoiceList onOperation={handleInvoiceOperation} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default QuickInvoice;
