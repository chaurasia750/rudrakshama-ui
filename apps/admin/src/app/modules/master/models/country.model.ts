export interface Country {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}

export interface CountryListResponse {
  items: Country[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface CountryPayload {
  name: string;
  code: string;
}
