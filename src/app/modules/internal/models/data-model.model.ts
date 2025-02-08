export interface Product {
    id: number;
    title: string;
    price: number | null;
    description: string;
    category: string;
    image?: string;
    rating?: {
        rate: number;
        count: number;
    }
}

export interface Invoice {
    userId: number | null;
    date: string | null;
    products: InvoiceItem[];
}

export interface InvoiceItem {
    productId: number | null;
    quantity: number| null;
}
