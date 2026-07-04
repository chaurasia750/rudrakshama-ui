export interface State {
  id: number;
  name: string;
  cid: number;
  countryName: string;
  isActive: boolean;
}

export interface StateListResponse {
  items: State[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface StatePayload {
  name: string;
  cid: number;
  isActive: boolean;
}

export interface UpdateStateStatusPayload {
  sActive: boolean;
}
