export type ITransactionTypeName = 'income' | 'outcome' | 'loan' | 'investment';

type ITransactionTypeTitle = 'Income' | 'Outcome' | 'Loans' | 'Investments';

export interface ITransactionType {
  id: number;
  name: ITransactionTypeName;
  title: ITransactionTypeTitle;
}

export interface ITransaction {
  type: ITransactionTypeName;
  _id: string;
  amount: number;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  phone: string;
  address: string;
}
