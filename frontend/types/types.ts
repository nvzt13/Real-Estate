
export interface CarSpecs {
  brand: string;
  model: string;
  year: number;
  fuel: 'Benzin' | 'Dizel' | 'Elektrik' | 'Hibrit';
  transmission: 'Manuel' | 'Otomatik';
  mileage?: string; // Optional for cars
  color?: string; // Optional for cars  
}
export interface HouseSpecs {
  rooms: string;
  area: string; // Area in square meters
  floor: string; // Floor number
  age: string; // Age of the house
  heating: string; // Heating type
  parking: string; // Parking availability
}
export interface LandSpecs {
  area: string; // Area in square meters
  cephe: string; // Frontage of the land
  imarDurumu: string; // Zoning status
  altYapı: string; // Substructure
  tapuDurumu: string; // Title deed status
  durum: string; // Condition of the land
}


// types.ts
export type Listing = {
  id?: number;
  category?: 'araba' | 'ev' | 'arsa';
  type: "Satılık" | "Kiralık",
  title: string;
  description?: string;
  price: number | null; // Nullable for listings without a price
  location: string;
  specs?: CarSpecs | HouseSpecs | LandSpecs;
  images?: string[];
  coordinates?: number[] | null; // Nullable for listings without coordinates
};

export interface Message {
  id?: number;
  sender?: number;
  is_admin?: boolean;
  created_at?: string;
  receiver: number;
  content: string;
}
export interface User {
  id?: number;
  name: string;
  lastName: string;
  is_staff?: boolean;
  favorites?: Listing[];
  email: string;
  password: string;
}

export interface MessageType {
  sender: number;
  content: string
}