import { transactionMock } from "../../mocks"
import { Transaction } from "./Transaction";

export const TransactionList = () => {
  const transactions = transactionMock
  console.log(transactions);
  return (
    <>
      <h2 className="sr-only">Accounts</h2>
      {transactions.map((transaction, index) => 
        <Transaction key={index} title={transaction.title} amount={transaction.amount} description={transaction.description} />
      )}
    </>
  )
}
