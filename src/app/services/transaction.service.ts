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
    this.transactions = JSON.parse(JSON.stringify(transactions)).data.map(
      (transaction: { amount: string | number }) => {
        const [min, max] = (transaction.amount as string)
          .slice('floating'.length)
          .slice(1, -1)
          .split(', ')
          .map((n) => Number.parseFloat(n));

        transaction.amount = Math.floor(Math.random() * (max - min + 1)) + min;
        return transaction;
      }
    );
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
