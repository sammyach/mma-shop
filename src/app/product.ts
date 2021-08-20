export interface Product {
    id?:string;
    code?:string;
    name?:string;
    description?:string;
    price?:number;
    quantity?:number;
    inventoryStatus?:string;
    category?:string;
    categoryId?:string;
    image?:string;
    rating?:number;
}

export interface CartProduct {
    productId?:string;
    name?:string;
    image?:string;
    price?:number;
    quantity?:number;
    subTotal?:number;
}