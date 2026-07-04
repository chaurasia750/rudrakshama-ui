export interface District {
  id: number;
  name: string;
  cid: number;
  countryName: string;
  sid: number;
  stateName: string;
  isActive: boolean;
}

export interface DistrictListResponse {
  items: District[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface DistrictPayload {
  name: string;
  cid: number;
  sid: number;
  isActive: boolean;
}

export interface UpdateDistrictStatusPayload {
  active: boolean;
}
