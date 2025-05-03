
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, FileText, Download, Image } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceFormProps {
  onInvoiceCreated: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onInvoiceCreated }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: field === "description" ? value : Number(value) };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveLogo = () => {
    setLogoPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save the invoice to a database here
    // For now, we'll just simulate success
    
    onInvoiceCreated();
    
    // Reset form
    setClientName("");
    setClientEmail("");
    setClientAddress("");
    setInvoiceDate(new Date().toISOString().split("T")[0]);
    setDueDate("");
    setNotes("");
    setItems([]);
    setLogoPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {/* Company Logo */}
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="flex items-start gap-4">
              <div className="border rounded-md p-2 w-32 h-32 flex items-center justify-center bg-muted/50">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Company Logo" 
                    className="max-w-full max-h-full object-contain" 
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Image className="h-8 w-8 mx-auto mb-1" />
                    <span className="text-xs">No logo</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Input 
                  id="logo" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleLogoUpload}
                />
                <p className="text-xs text-muted-foreground">Upload your company logo (max 5MB)</p>
                {logoPreview && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleRemoveLogo}
                  >
                    <Trash2 className="mr-1 h-4 w-4 text-red-500" /> Remove Logo
                  </Button>
                )}
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium">Client Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientAddress">Client Address</Label>
            <Textarea
              id="clientAddress"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Invoice Details</h3>
          
          <div className="space-y-2">
            <Label htmlFor="invoiceDate">Invoice Date</Label>
            <Input
              id="invoiceDate"
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Invoice Items</h3>
          <Button type="button" onClick={handleAddItem} variant="outline" size="sm">
            <Plus className="mr-1 h-4 w-4" /> Add Item
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price ($)</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No items added. Click "Add Item" to add your first item.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Item description"
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)}
                      required
                    />
                  </TableCell>
                  <TableCell>${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
            {items.length > 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  Total:
                </TableCell>
                <TableCell className="font-bold">
                  ${calculateTotal().toFixed(2)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex gap-4 justify-end">
        <Button type="submit" disabled={items.length === 0}>
          <FileText className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
