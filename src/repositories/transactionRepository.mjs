import transactionModel from '../models/Transaction.mjs';

export default class TransactionRepository {
  async add(transaction) {
    const transactionData = {
      id: transaction.id,
      input: transaction.input,
      outputs: transaction.outputs,
    };

    return await Transactions.create(transactionData);
  }

  async list() {
    return await Transactions.find();
  }

  async findById(id) {
    return await Transactions.findOne({ id });
  }
}
