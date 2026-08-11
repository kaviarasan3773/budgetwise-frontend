const ExpenseTable = ({
    expenseList,
    onEdit,
    onDelete
}) => {

    if (expenseList.length === 0) {
        return <h3>No Expense Records Found</h3>;
    }

    return (
        <div className="expense-table">

            <h2>Expense History</h2>

            <table border="1" cellPadding="8">

                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Expense Date</th>
                        <th>Remarks</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>

                    {expenseList.map((expense) => (

                        <tr key={expense.expenseId}>

                            <td>
                                {expense.category}
                            </td>

                            <td>
                                {expense.amount}
                            </td>

                            <td>
                                {expense.expenseDate}
                            </td>

                            <td>
                                {expense.remarks}
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        onEdit(expense)
                                    }
                                >
                                    Edit
                                </button>
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        onDelete(
                                            expense.expenseId
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default ExpenseTable;