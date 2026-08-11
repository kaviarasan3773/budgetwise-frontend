const IncomeTable = ({ incomeList, onEdit, onDelete }) => {

    if (incomeList.length === 0) {
        return (
            <h3>No Income Records Found</h3>
        );
    }

    return (

        <div className="income-table">

            <h2>Income History</h2>

            <table border="1" cellPadding="8">

                <thead>

                    <tr>

                        <th>Income Type</th>

                        <th>Source Name</th>

                        <th>Amount</th>

                        <th>Income Month</th>

                        <th>Income Date</th>

                        <th>Remarks</th>

                        <th>Edit</th>

                        <th>Delete</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        incomeList.map((income) => (

                            <tr key={income.incomeId}>

                                <td>{income.incomeType}</td>

                                <td>{income.sourceName}</td>

                                <td>{income.amount}</td>

                                <td>{income.incomeMonth}</td>

                                <td>{income.incomeDate}</td>

                                <td>{income.remarks}</td>

                                <td>

                                    <button
                                        onClick={() => onEdit(income)}
                                    >
                                        Edit
                                    </button>

                                </td>

                                <td>

                                    <button
                                        onClick={() => onDelete(income.incomeId)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

};

export default IncomeTable;