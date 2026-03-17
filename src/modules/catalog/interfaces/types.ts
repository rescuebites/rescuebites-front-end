//search interface
export interface SearchSuggestion {
  id: string;
  label: string;
  type: "PRODUCT" | "COMMERCE";
}


// interfaces/common.ts
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;       // página actual
  size: number;
  first: boolean;
  last: boolean;
}