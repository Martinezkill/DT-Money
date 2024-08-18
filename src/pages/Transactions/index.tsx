import { useContext } from "react"
import { Header } from "../../components/Header"
import { Summary } from "../../components/Header/Summary"
import { SearchForm } from "./components/searchForm index"
import { PriceHighlight, TransactionsContainer } from "./styles"
import { TransactionsTable } from "./styles"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { dateFormatter, priceFormatter } from "../../utils/formatter"


export function Transactions() {
    const {transactions} = useContext(TransactionsContext)
    
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm/>
            <TransactionsTable>
                <tbody>
                    {transactions.map(transaction => {
                        return (
                            <tr key={transaction.id}>
                        <td width="50%">{transaction.description}</td>
                        <td>
                            <PriceHighlight variant={transaction.type}>
                                {transaction.type === 'outcome' && '- '}
                            {priceFormatter.format(transaction.price)}
                            </PriceHighlight>
                            </td>
                            
                        <td>{transaction.category}</td>
                        <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                    </tr>
                        )
                    })}
                </tbody>
            </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}