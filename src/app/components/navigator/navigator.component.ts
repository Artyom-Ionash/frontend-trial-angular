import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TransactionService } from '../../services/transaction.service';
import { ITransaction, ITransactionType } from '../../models/ITransaction';

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
      const paramTabId = params.get('tab');
      if (paramTabId) {
        this.selectedTabId = Number.parseInt(paramTabId);
        const currentType = this.tabs.find(
          (tab) => tab.id === this.selectedTabId
        );
        if (currentType === undefined)
          throw new Error(`Tab ID ${this.selectedTabId} is not valid!`);

        this.transactions = this.transactionService.getTransactionsByType(
          currentType.name
        );
      }
    });
  }
}
