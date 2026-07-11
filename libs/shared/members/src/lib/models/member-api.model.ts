import { Member } from './member.model';

export interface MemberListResponse {
  indexFrom: number;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: Member[];
}

export interface GetMembersRequest {
  Keyword?: string;
  Status?: number;
  PageIndex?: number;
  PageSize?: number;
  SortingOrder?: number;
  ColName?: string;
}

export interface MemberLoginDetails {
  id: number;
  loginId: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
}

export interface Kit {
  id: number;
  kitCode: string;
  kitPrice: number;
}

export interface KitListResponse {
  items: Kit[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CompanyBankAccount {
  id: number;
  bankName: string;
  accountNo: string;
  accountName?: string;
  ifscCode?: string;
  ifsccode?: string;
  branchName?: string;
  address?: string;
  paymentTypeId?: number;
  upiId?: string;
}

export interface EPinRequestPayload {
  memberId: number;
  kitId: number;
  quantity: number;
}

export interface PaymentTransactionPayload {
  referenceType: string;
  referenceNo: string;
  referenceId: string;
  amount: number;
  paymentMode: string;
  status: string;
  mediaId?: number;
}
