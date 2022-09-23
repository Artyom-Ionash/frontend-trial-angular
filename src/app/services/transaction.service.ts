import { Injectable } from '@angular/core';

import {
  ITransaction,
  ITransactionType,
  ITransactionTypeName,
} from '../models/ITransaction';
import transactions from '../../assets/transactions.json';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: ITransaction[] = [];

  constructor() {
    this.transactions = JSON.parse(JSON.stringify(transactions)).data;
  }

  getAllTransactions(): ITransaction[] {
    return this.transactions;
  }

  getTransactionTypes(): ITransactionType[] {
    return [
      { id: 0, name: 'income', title: 'Income' },
      { id: 1, name: 'outcome', title: 'Outcome' },
      { id: 2, name: 'loan', title: 'Loans' },
      { id: 3, name: 'investment', title: 'Investments' },
    ];
  }

  getTransactionsByType(transactionType: ITransactionTypeName): ITransaction[] {
    return this.transactions.filter((user) => user.type === transactionType);
  }
}
