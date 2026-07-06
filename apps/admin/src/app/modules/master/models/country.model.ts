export interface Country {
  id: number;
  name: string;
  isActive: boolean;
}

export interface CountryListResponse {
  items: Country[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface CountryFilterModel {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
  sortingOrder?: number;
  colName?: string;
  active?: boolean;
}

export interface CountryPayload {
  name: string;
  isActive: boolean;
}

export interface UpdateCountryStatusPayload {
  cActive: boolean;
}
