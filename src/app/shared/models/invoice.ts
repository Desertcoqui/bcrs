/**
 * invoice.ts
 * Author: Professor Krasso
 * Modified: Manel Phiseme
 * Date : 02/23/2023
 * Description: invoice typescript 
 */

import { LineItem } from "./line-item.interface";

export class Invoice {
    private username: string;
    private lineItems: LineItem[]
    private orderDate: string;
    private LABOR_RATE: number = 50;

    partsAmount: number;
    laborHours: number;

    constructor(username?: string, partsAmount?: number, laborHours?: number){
        this.username = username || '';
        this.partsAmount = partsAmount || 0;
        this.laborHours = laborHours || 0;
        this.orderDate = new Date().toLocaleDateString()
        this.lineItems = [];
    }

    getUsername(): string {
        return this.username;
    }

    setLineItems(lineItems: LineItem[]): void{
        this.lineItems = lineItems;
    }
    
    getLineItemTotal(): number {
        let total: number = 0;
        for (let lineItem of this.lineItems){
            total += lineItem.price;
        }

        return Number(total);
    }

    getLaborAmount(): number {
        return Number(this.laborHours) * Number(this.LABOR_RATE);
    }

    getOrderDate(): string {
        return this.orderDate;
    }

    //May not be correct (will come back to)
    getTotal(): number {
        return this.getLineItemTotal()
    }

}

