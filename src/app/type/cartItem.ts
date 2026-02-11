import { Product } from "./product";

export interface CartItem {
  _id: string;
  userId: string;
  productId: string[];   
  quantity: number;
}
