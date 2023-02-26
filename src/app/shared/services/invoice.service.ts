/**
 * Bob's Computer Repair Shop
 * Author: Professor Krasso
 * Modified: Kailee Stephens
 * Date : 02/25/2023
 * Description: invoice.service.ts
 */

import { Injectable } from '@angular/core';
import {Invoice} from "../models/invoice";
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    
    constructor(private http: HttpClient) { }

    createInvoice(userName: string, invoice: Invoice): Observable<any> {
        return this.http.post(`/api/invoices/${userName}`, {
            userName: userName, 
            lineItems: invoice.getLineItems(),
            partsAmount: invoice.partsAmount,
            laborAmount: invoice.getLaborAmount(),
            lineItemTotal: invoice.getLineItemTotal(),
            total: invoice.getTotal()
        })
    }

    findPurchasesByServiceGraph(): Observable<any> {
        return this.http.get(`/api/invoices/purchases-graph`);
    }
}