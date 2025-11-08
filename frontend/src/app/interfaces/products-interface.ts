export namespace Products {
  export interface ProductsRequest {

  }

  export interface ProductsResponse {
    id: string;
    name: string;
    amount: number;
    description: string;
    price: string;
    category: {
      id: string;
      name: string;
    };
  }
}