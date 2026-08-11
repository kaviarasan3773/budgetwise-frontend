const InvestmentTable = ({
    investmentList,
    onEdit,
    onDelete
}) => {

    if (investmentList.length === 0) {
        return (
            <h3>No Investment Records Found</h3>
        );
    }

    return (
        <div className="investment-table">

            <h2>Investment History</h2>

            <table border="1" cellPadding="8">

                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Remarks</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>

                    {investmentList.map(
                        (investment) => (

                            <tr
                                key={
                                    investment.investmentId
                                }
                            >

                                <td>
                                    {
                                        investment
                                            .investmentType
                                    }
                                </td>

                                <td>
                                    {
                                        investment
                                            .investmentName
                                    }
                                </td>

                                <td>
                                    {
                                        investment.amount
                                    }
                                </td>

                                <td>
                                    {
                                        investment
                                            .investmentDate
                                    }
                                </td>

                                <td>
                                    {
                                        investment.remarks
                                    }
                                </td>

                                <td>
                                    <button
                                        onClick={() =>
                                            onEdit(
                                                investment
                                            )
                                        }
                                    >
                                        Edit
                                    </button>
                                </td>

                                <td>
                                    <button
                                        onClick={() =>
                                            onDelete(
                                                investment
                                                    .investmentId
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        )
                    )}

                </tbody>

            </table>

        </div>
    );
};

export default InvestmentTable;