import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TransactionService } from '../../services/transaction.service';
import { ITransaction, ITransactionType } from '../../models/ITransaction';
// import IUsersType from 'src/services/user/IUsersType';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit {
  transactions: ITransaction[] = [];
  tabs: ITransactionType[] = [];
  selectedTabId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.tabs = this.transactionService.getTransactionTypes();

    this.route.queryParamMap.subscribe((params) => {
      const tabId = params.get('tab');
      if (tabId) {
        this.getTransactionsByType(tabId);
        this.selectedTabId = Number.parseInt(tabId);
      }
    });
  }

  getTransactionsByType(id: string): void {
    const tabId = Number.parseInt(id);
    const currentType = this.tabs.find((tab) => tab.id === tabId);
    if (currentType === undefined)
      throw new Error(`Tab ID ${id} is not valid!`);

    this.transactions = this.transactionService.getTransactionsByType(
      currentType.name
    );

    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (this.transactions) {
      this.transactions.map((user) => {
        user.amount = getRandomInt(0, 1000);
      });
    }
  }
}
