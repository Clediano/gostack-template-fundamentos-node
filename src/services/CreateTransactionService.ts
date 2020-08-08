import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: CreateTransactionDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value >= total) {
      throw new Error(`Output value greater than the total (${total}).`);
    }
    const newTransaction = new Transaction({
      title,
      type,
      value,
    });
    return this.transactionsRepository.create(newTransaction);
  }
}

export default CreateTransactionService;
