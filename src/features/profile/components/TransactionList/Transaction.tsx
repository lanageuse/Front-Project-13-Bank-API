import type { FunctionComponent } from "react"
import type { TransactionProps } from "../../types"


/**
 * Formate un montant en devise selon la locale et la devise spécifiées.
 * 
 * @param {number} price - Le montant à formater
 * @param {string} locale - La locale pour le formatage
 * @param {string} currency - La devise à utiliser
 * @returns {string} Le montant formaté en devise
 */
const  formatPrice = (price : number, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(price);
}

/**
 * Composant Transaction - Affiche une carte de transaction avec titre, montant et description.
 * 
 * @param {TransactionProps} props - Les propriétés de la transaction
 * @param {string} props.title - Le titre de la transaction
 * @param {number} props.amount - Le montant de la transaction
 * @param {string} props.description - La description de la transaction
 * @returns {JSX.Element} Carte de transaction avec bouton d'action
 */

export const Transaction: FunctionComponent<TransactionProps> = (props) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{props.title}</h3>
        <p className="account-amount">{formatPrice(props.amount)}</p>
        <p className="account-amount-description">{props.description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}
