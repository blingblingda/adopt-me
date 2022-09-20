export type Animal = "dog" | "cat" | "bird" | "rabbit" | "reptile";

export interface Pet {
  id: number;
  name: string;
  animal: Animal;
  breed: string;
  description: string;
  images: string[];
  city: string;
  state: string;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}
