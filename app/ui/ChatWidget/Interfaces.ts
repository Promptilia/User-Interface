export interface Option {
  text?: string;
  tbs: string;
}

export interface Filter {
  type: string;
  options: Option[];
}

export interface Message {
  isBotResponse: boolean;
  message?: string | string[];
  filters?: Filter[];
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}
