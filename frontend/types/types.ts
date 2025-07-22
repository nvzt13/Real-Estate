
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
  id: string;
  category: 'araba' | 'ev' | 'arsa';
  type: "Satılık" | "Kiralık",
  title: string;
  description: string;
  price: number;
  location: string;
  specs: CarSpecs | HouseSpecs | LandSpecs;
  imageMain: string;
  images: string[];
  coordinates: [number, number];
};
