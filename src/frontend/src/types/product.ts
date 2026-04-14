export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  category: string;
  description: string;
  currency?: string;
}

export type ProductCategory =
  | "Bags"
  | "Jewellery"
  | "Scarves"
  | "Watches"
  | "Shoes"
  | "Accessories";
