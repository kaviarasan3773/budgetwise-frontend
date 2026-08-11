const RecentTransactions = ({ transactions }) => {

    if (!transactions || transactions.length === 0) {

        return (
            <div className="recent-transactions-empty">
                <p>No transactions found.</p>
            </div>
        );
    }


    return (
        <div className="recent-transactions-list">

            {transactions.map(
                (transaction, index) => {

                    const isIncome =
                        transaction.type === "Income";

                    return (
                        <div
                            className="recent-transaction"
                            key={index}
                        >

                            <div className="transaction-info">

                                <strong>
                                    {transaction.title}
                                </strong>

                                <span>
                                    {transaction.type}
                                </span>

                            </div>


                            <div
                                className={
                                    isIncome
                                        ? "transaction-amount income"
                                        : "transaction-amount expense"
                                }
                            >

                                {isIncome
                                    ? "+"
                                    : "-"
                                }

                                ₹
                                {Number(
                                    transaction.amount
                                ).toFixed(2)}

                                <small>
                                    {transaction.date}
                                </small>

                            </div>

                        </div>
                    );
                }
            )}

        </div>
    );
};


export default RecentTransactions;