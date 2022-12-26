import { useTransactions } from "../../hooks/useTransactions";

import incomes from "../../assets/incomes.svg";
import expenses from "../../assets/expenses.svg";
import total from "../../assets/total.svg";

import { Container } from "./styles";

export function Summary() {
    const { transactions } = useTransactions();
    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type == "deposit") {
            acc.deposits += transaction.value;
        } else {
            acc.withdraws += transaction.value;
        };

        acc.totals = acc.deposits - acc.withdraws;
        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        totals: 0
    });
    
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomes} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.deposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={expenses} alt="Saídas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.withdraws)}
                </strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={total} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.totals)}
                </strong>
            </div>
        </Container>
    );
}