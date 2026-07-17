import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';

export interface WalletData {
  loginId: string | null;
  memberName: string | null;
  currentBalance: string | null;
  totalCredit: string | null;
  totalDebit: string | null;
  status: string | null;
}

export interface Transaction {
  regNo: number | null;
  transactionDate: string | null;
  credit: number | null;
  debit: number | null;
  crdb: string | null;
  transactionType: string | null;
  remark: string | null;
  shortRemark: string | null;
}

@Injectable({ providedIn: 'root' })
export class CurrencyWalletService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/members`;

  getEwalletStatus(loginId: string): Observable<Record<string, any>> {
    return this.http.get<Record<string, any>>(`${this.baseUrl}/ewallet-status`, {
      params: { loginId },
    });
  }

  getTransactionHistory(loginId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transaction-history`, {
      params: { loginId },
    });
  }
}
