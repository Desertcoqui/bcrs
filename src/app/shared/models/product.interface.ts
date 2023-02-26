/**
 * Bob's Computer Repair Shop
 * Author: Professor Krasso
 * Modified: Kailee Stephens
 * Date : 02/26/2023
 * Description: product interface
*/

export interface Product {
    id: number;
    title: string;
    price: number;
    checked: boolean;
}