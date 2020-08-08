import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let totalIncome = 0;
    let totalOutcome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += Number(transaction.value);
      } else {
        totalOutcome += Number(transaction.value);
      }
    });
    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: Number(totalIncome - totalOutcome),
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
