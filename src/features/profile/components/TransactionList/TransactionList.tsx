import { transactionMock } from "../../mocks"
import { Transaction } from "./Transaction";

/**
 * Composant TransactionList - Affiche la liste des transactions utilisateur.
 * Utilise actuellement des données mockées pour l'affichage.
 * 
 * @returns {JSX.Element} Liste des transactions avec titre accessible
 */

export const TransactionList = () => {
  const transactions = transactionMock
  return (
    <>
      <h2 className="sr-only">Accounts</h2>
      {transactions.map((transaction, index) => 
        <Transaction key={index} title={transaction.title} amount={transaction.amount} description={transaction.description} />
      )}
    </>
  )
}
