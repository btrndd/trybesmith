export interface CreatedProduct {
  id: number;
  
  name: string;

  amount: string;
}

export interface CompleteProduct extends CreatedProduct {
  orderId?: number;
}