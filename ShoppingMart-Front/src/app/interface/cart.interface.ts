import { Product } from "./product.interface";

export interface Cart {
    id: number;
    user: any;
    product: Product;
    quantity: number;
}