/**
 * invoice-summary-dialog.component.ts
 * Author: Professor Krasso
 * Modified: Manel Phiseme
 * Date : 02/23/2023
 * Description: invoice summary dialog components 
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../../models/invoice';


@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {

  invoice: Invoice;
  username: string;
  orderDate: string;
  total: number;
  labor: number;
  parts: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.invoice = {} as Invoice;
    this.invoice = data.invoice;
    this.username = '';
    this.orderDate = '';
    this.total = 0 ;
    this.labor = 0;
    this.parts = 0;

    this.username = this.invoice.getUsername();
    this.orderDate = this.invoice.getOrderDate();
    this.parts = this.invoice.partsAmount;
    this.labor = this.invoice.getLaborAmount();
    this.total = this.invoice.getTotal();

    console.log(this.invoice)

   }

  ngOnInit(): void {
  }

}
