import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Printer, X } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    unit: string;
}

interface InvoiceDetailsProps {
    invoice: {
        id: string;
        client: string;
        clientEmail: string;
        clientAddress: string;
        date: string;
        dueDate: string;
        amount: number;
        status: string;
        items: InvoiceItem[];
        notes: string;
        paymentMethod: string;
        paymentReference: string | null;
    };
    onClose: () => void;
    onPrint: (id: string) => void;
    onDownload: (id: string) => void;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
    invoice,
    onClose,
    onPrint,
    onDownload,
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "overdue":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const printContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Invoice ${invoice.id}</title>
              <style>
                @page {
                  size: A4;
                  margin: 20mm;
                }
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  color: #333;
                  background: white;
                }
                .invoice-container {
                  max-width: 100%;
                  margin: 0 auto;
                  padding: 20px;
                }
                .invoice-header {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 40px;
                  border-bottom: 2px solid #eee;
                  padding-bottom: 20px;
                }
                .company-info {
                  flex: 1;
                }
                .invoice-info {
                  text-align: right;
                }
                .invoice-title {
                  font-size: 24px;
                  color: #4CAF50;
                  margin: 0 0 10px 0;
                }
                .invoice-number {
                  font-size: 16px;
                  color: #666;
                }
                .client-info {
                  margin-bottom: 40px;
                  padding: 20px;
                  background: #f8f9fa;
                  border-radius: 4px;
                }
                .client-info h3 {
                  color: #666;
                  font-size: 14px;
                  margin: 0 0 5px 0;
                }
                .client-info p {
                  margin: 0 0 5px 0;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 40px;
                  background: white;
                }
                th {
                  background-color: #f8f9fa;
                  padding: 12px;
                  text-align: left;
                  border-bottom: 2px solid #eee;
                  color: #666;
                  font-weight: 600;
                }
                td {
                  padding: 12px;
                  border-bottom: 1px solid #eee;
                }
                .text-right {
                  text-align: right;
                }
                .total-row {
                  font-weight: bold;
                  background-color: #f8f9fa;
                }
                .notes {
                  margin-top: 40px;
                  padding: 20px;
                  background: #f8f9fa;
                  border-radius: 4px;
                }
                .notes h3 {
                  color: #666;
                  font-size: 14px;
                  margin: 0 0 10px 0;
                }
                .footer {
                  margin-top: 40px;
                  padding: 20px;
                  border-top: 2px solid #eee;
                  text-align: center;
                  color: #666;
                  font-size: 12px;
                }
                @media print {
                  body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                  }
                  .invoice-container {
                    padding: 0;
                  }
                  .no-print {
                    display: none;
                  }
                }
              </style>
            </head>
            <body>
              <div class="invoice-container">
                <div class="invoice-header">
                  <div class="company-info">
                    <h1 class="invoice-title">YieldQuip</h1>
                    <p>Smart Farming Solutions</p>
                    <p>123 Agriculture Street</p>
                    <p>Nairobi, Kenya</p>
                  </div>
                  <div class="invoice-info">
                    <h2 class="invoice-title">INVOICE</h2>
                    <p class="invoice-number">${invoice.id}</p>
                    <p>Date: ${invoice.date}</p>
                    <p>Due Date: ${invoice.dueDate}</p>
                  </div>
                </div>

                <div class="client-info">
                  <h3>Bill To:</h3>
                  <p><strong>${invoice.client}</strong></p>
                  <p>${invoice.clientEmail}</p>
                  <p>${invoice.clientAddress}</p>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th class="text-right">Quantity</th>
                      <th class="text-right">Unit Price</th>
                      <th class="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${invoice.items.map(item => `
                      <tr>
                        <td>
                          <strong>${item.description}</strong><br>
                          <span style="color: #666;">per ${item.unit}</span>
                        </td>
                        <td class="text-right">${item.quantity}</td>
                        <td class="text-right">$${item.unitPrice.toFixed(2)}</td>
                        <td class="text-right">$${(item.quantity * item.unitPrice).toFixed(2)}</td>
                      </tr>
                    `).join('')}
                    <tr class="total-row">
                      <td colspan="3" class="text-right">Total Amount</td>
                      <td class="text-right">$${invoice.amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>

                ${invoice.notes ? `
                  <div class="notes">
                    <h3>Notes</h3>
                    <p>${invoice.notes}</p>
                  </div>
                ` : ''}

                <div class="footer">
                  <p>Thank you for your business!</p>
                  <p>Payment Method: ${invoice.paymentMethod}</p>
                  ${invoice.paymentReference ? `<p>Payment Reference: ${invoice.paymentReference}</p>` : ''}
                </div>
              </div>
            </body>
          </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();

        printWindow.onload = function () {
            printWindow.print();
            printWindow.close();
        };
    };

    const handleDownload = () => {
        const doc = new jsPDF();

        // Add company header
        doc.setFontSize(24);
        doc.setTextColor(76, 175, 80); // Green color
        doc.text('YieldQuip', 20, 20);

        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text('Smart Farming Solutions', 20, 30);
        doc.text('123 Agriculture Street', 20, 35);
        doc.text('Nairobi, Kenya', 20, 40);

        // Add invoice title and details
        doc.setFontSize(20);
        doc.setTextColor(76, 175, 80);
        doc.text('INVOICE', 140, 20);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Invoice #: ${invoice.id}`, 140, 30);
        doc.text(`Date: ${invoice.date}`, 140, 35);
        doc.text(`Due Date: ${invoice.dueDate}`, 140, 40);

        // Add client information
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Bill To:', 20, 60);
        doc.setFontSize(10);
        doc.text(invoice.client, 20, 70);
        doc.text(invoice.clientEmail, 20, 75);
        doc.text(invoice.clientAddress, 20, 80);

        // Add items table
        const tableColumn = ['Description', 'Quantity', 'Unit Price', 'Total'];
        const tableRows = invoice.items.map(item => [
            item.description,
            item.quantity.toString(),
            `$${item.unitPrice.toFixed(2)}`,
            `$${(item.quantity * item.unitPrice).toFixed(2)}`
        ]);

        // Add total row
        tableRows.push(['', '', 'Total Amount', `$${invoice.amount.toFixed(2)}`]);

        (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 90,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 5,
            },
            headStyles: {
                fillColor: [248, 249, 250],
                textColor: [100, 100, 100],
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [248, 249, 250],
            },
        });

        // Add notes if they exist
        if (invoice.notes) {
            const finalY = (doc as any).lastAutoTable.finalY || 150;
            doc.setFontSize(12);
            doc.text('Notes:', 20, finalY + 20);
            doc.setFontSize(10);
            doc.text(invoice.notes, 20, finalY + 30);
        }

        // Add footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Thank you for your business!', 20, pageHeight - 30);
        doc.text(`Payment Method: ${invoice.paymentMethod}`, 20, pageHeight - 25);
        if (invoice.paymentReference) {
            doc.text(`Payment Reference: ${invoice.paymentReference}`, 20, pageHeight - 20);
        }

        // Save the PDF
        doc.save(`invoice-${invoice.id}.pdf`);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                    <CardTitle className="text-2xl font-bold">Invoice Details</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        {invoice.id}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Client Information */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Client Information</h3>
                        <div className="space-y-1">
                            <p className="font-semibold">{invoice.client}</p>
                            <p className="text-sm text-muted-foreground">{invoice.clientEmail}</p>
                            <p className="text-sm text-muted-foreground">{invoice.clientAddress}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Invoice Information</h3>
                        <div className="space-y-1">
                            <p className="text-sm">
                                <span className="text-muted-foreground">Issue Date: </span>
                                {invoice.date}
                            </p>
                            <p className="text-sm">
                                <span className="text-muted-foreground">Due Date: </span>
                                {invoice.dueDate}
                            </p>
                            <p className="text-sm">
                                <span className="text-muted-foreground">Payment Method: </span>
                                {invoice.paymentMethod}
                            </p>
                            {invoice.paymentReference && (
                                <p className="text-sm">
                                    <span className="text-muted-foreground">Payment Reference: </span>
                                    {invoice.paymentReference}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Invoice Items */}
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Invoice Items</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">Unit Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoice.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{item.description}</p>
                                            <p className="text-sm text-muted-foreground">per {item.unit}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                    <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                                    <TableCell className="text-right font-medium">
                                        ${(item.quantity * item.unitPrice).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={3} className="text-right font-medium">
                                    Total Amount
                                </TableCell>
                                <TableCell className="text-right font-bold text-lg">
                                    ${invoice.amount.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                {/* Notes */}
                {invoice.notes && (
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                        <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default InvoiceDetails; 