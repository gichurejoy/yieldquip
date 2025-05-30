import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Printer, CreditCard } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import InvoiceDetails from "./InvoiceDetails";

// Sample data for demonstration
const sampleInvoices = [
  {
    id: "INV-2025-001",
    client: "Green Fields Farm",
    clientEmail: "contact@greenfields.com",
    clientAddress: "123 Farm Road, Agricultural Zone, Nairobi",
    date: "2025-05-01",
    dueDate: "2025-05-15",
    amount: 1250.75,
    status: "paid",
    items: [
      {
        id: "item-1",
        description: "Organic Maize Seeds",
        quantity: 50,
        unitPrice: 15.99,
        unit: "kg"
      },
      {
        id: "item-2",
        description: "NPK Fertilizer",
        quantity: 25,
        unitPrice: 35.99,
        unit: "kg"
      }
    ],
    notes: "Delivery included. Payment terms: 15 days",
    paymentMethod: "MPesa",
    paymentReference: "MPESA-123456"
  },
  {
    id: "INV-2025-002",
    client: "Sunset Orchards",
    clientEmail: "info@sunsetorchards.com",
    clientAddress: "456 Orchard Lane, Fruit Valley, Mombasa",
    date: "2025-05-01",
    dueDate: "2025-05-15",
    amount: 875.50,
    status: "pending",
    items: [
      {
        id: "item-1",
        description: "Fruit Tree Saplings",
        quantity: 20,
        unitPrice: 35.75,
        unit: "pieces"
      },
      {
        id: "item-2",
        description: "Organic Pesticide",
        quantity: 10,
        unitPrice: 14.80,
        unit: "liters"
      }
    ],
    notes: "Free delivery for orders above 500",
    paymentMethod: "Bank Transfer",
    paymentReference: null
  },
  {
    id: "INV-2025-003",
    client: "Valley Dairy Co-op",
    clientEmail: "sales@valleydairy.com",
    clientAddress: "789 Dairy Road, Milk Valley, Nakuru",
    date: "2025-04-28",
    dueDate: "2025-05-12",
    amount: 2340.00,
    status: "overdue",
    items: [
      {
        id: "item-1",
        description: "Dairy Feed",
        quantity: 100,
        unitPrice: 20.00,
        unit: "kg"
      },
      {
        id: "item-2",
        description: "Mineral Supplements",
        quantity: 25,
        unitPrice: 13.60,
        unit: "kg"
      }
    ],
    notes: "Bulk order discount applied",
    paymentMethod: "Bank Transfer",
    paymentReference: null
  },
  {
    id: "INV-2025-004",
    client: "Highland Livestock",
    clientEmail: "contact@highlandlivestock.com",
    clientAddress: "321 Highland Road, Livestock Zone, Eldoret",
    date: "2025-04-25",
    dueDate: "2025-05-09",
    amount: 1675.25,
    status: "paid",
    items: [
      {
        id: "item-1",
        description: "Animal Feed",
        quantity: 75,
        unitPrice: 18.50,
        unit: "kg"
      },
      {
        id: "item-2",
        description: "Veterinary Supplies",
        quantity: 15,
        unitPrice: 45.35,
        unit: "pieces"
      }
    ],
    notes: "Priority delivery requested",
    paymentMethod: "MPesa",
    paymentReference: "MPESA-789012"
  },
  {
    id: "INV-2025-005",
    client: "Organic Harvests Inc.",
    clientEmail: "info@organicharvests.com",
    clientAddress: "654 Organic Street, Green Valley, Kisumu",
    date: "2025-04-20",
    dueDate: "2025-05-04",
    amount: 925.00,
    status: "pending",
    items: [
      {
        id: "item-1",
        description: "Organic Seeds Collection",
        quantity: 30,
        unitPrice: 25.00,
        unit: "packets"
      },
      {
        id: "item-2",
        description: "Natural Fertilizer",
        quantity: 20,
        unitPrice: 8.75,
        unit: "kg"
      }
    ],
    notes: "Standard delivery",
    paymentMethod: "Bank Transfer",
    paymentReference: null
  },
];

interface InvoiceListProps {
  onOperation?: (operation: string, invoiceId: string) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ onOperation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState(sampleInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof sampleInvoices[0] | null>(null);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "overdue":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices(invoices.map(inv =>
      inv.id === invoiceId ? { ...inv, status: "paid" } : inv
    ));

    if (onOperation) {
      onOperation("paid", invoiceId);
    } else {
      toast(`${invoiceId} has been marked as paid successfully.`, {
        description: "The invoice status has been updated.",
      });
    }
  };

  const handlePrint = (invoiceId: string) => {
    if (onOperation) {
      onOperation("print", invoiceId);
    } else {
      toast(`Printing ${invoiceId}...`, {
        description: "Your invoice is being sent to the printer.",
      });
      window.print();
    }
  };

  const handleDownload = (invoiceId: string) => {
    if (onOperation) {
      onOperation("download", invoiceId);
    } else {
      toast(`${invoiceId} has been downloaded successfully.`, {
        description: "Your invoice file is ready.",
      });
    }
  };

  const handleExport = () => {
    if (onOperation) {
      onOperation("export", "all");
    } else {
      toast("Invoices exported", {
        description: "All invoices have been exported successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {selectedInvoice && (
        <InvoiceDetails
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onPrint={handlePrint}
          onDownload={handleDownload}
        />
      )}

      <div className="flex gap-4 items-center justify-between flex-wrap">
        <div className="relative w-full md:w-64">
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(invoice.status)}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Print"
                        onClick={() => handlePrint(invoice.id)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Download"
                        onClick={() => handleDownload(invoice.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {invoice.status !== "paid" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Mark as Paid"
                          onClick={() => handleMarkAsPaid(invoice.id)}
                        >
                          <CreditCard className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceList;
