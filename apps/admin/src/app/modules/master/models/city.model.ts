export interface City {
  id: number;
  cityName: string;
  pincode: string;
  cid: number;
  countryName: string;
  sid: number;
  stateName: string;
  distId: number;
  districtName: string;
  isActive: boolean;
}

export interface CityListResponse {
  items: City[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface CityFilterModel {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
  sortingOrder?: number;
  colName?: string;
  cid?: number;
  sid?: number;
  distId?: number;
  active?: boolean;
}

export interface UpdateCityPayload {
  cityName: string;
  pincode: string;
  active: boolean;
}
