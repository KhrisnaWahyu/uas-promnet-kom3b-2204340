import axios from 'axios';

const TRANSACTION_API_BASE_URL = 'http://localhost:9080/api/reports';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

class TransactionService {
  getTransactions() {
    return axiosInstance.get(TRANSACTION_API_BASE_URL);
  }

  createTransaction(transaction) {
    return axiosInstance.post(TRANSACTION_API_BASE_URL, transaction);
  }

  getTransactionById(transactionId) {
    return axiosInstance.get(`${TRANSACTION_API_BASE_URL}/${transactionId}`);
  }

  updateTransaction(transaction, transactionId) {
    return axiosInstance.put(`${TRANSACTION_API_BASE_URL}/${transactionId}`, transaction);
  }

  deleteTransaction(transactionId) {
    return axiosInstance.delete(`${TRANSACTION_API_BASE_URL}/${transactionId}`);
  }
}

export default new TransactionService();
