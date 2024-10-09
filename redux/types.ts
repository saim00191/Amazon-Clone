
export interface Image {
    src: string; 
    alt?: string; 
}
  
export interface Products {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: Image;
    quantity: number; 
}
  
export interface UserInformation {
    name: string | null;
    email: string | null;
}
  
export interface AmazonState {
    products: Products[];
    userInformation: UserInformation | null;
  }
  