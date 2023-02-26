/**
 * Bob's Computer Repair Shop
 * Author: Professor Krasso
 * Modified: Kailee Stephens
 * Date : 02/25/2023
 * Description: product.service.ts
 */

import { Injectable } from "@angular/core";
import {Product} from "../models/product.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    products: Product[];

    constructor() {
        this.products = [
            {
                id: 100,
                title: 'Password Reset',
                price: 39.99,
                checked: false
            },
            {
                id: 101,
                title: 'Spyware Removal',
                price: 99.99,
                checked: false
            },
            {
                id: 102,
                title: 'RAM Upgrade',
                price: 129.99,
                checked: false
            },
            {
                id: 103,
                title: 'Software Installation',
                price: 49.99,
                checked: false
            },
            {
                id: 104,
                title: 'PC Tune-Up',
                price: 89.99,
                checked: false
            },
            {
                id: 105,
                title: 'Keyboard Cleaning',
                price: 45.00,
                checked: false
            },
            {
                id: 106,
                title: 'Disk Clean-Up',
                price: 149.99,
                checked: false
            }
        ]
    }

    getProducts(): Product[] {
        return this.products;
    }
}