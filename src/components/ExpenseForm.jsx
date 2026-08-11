import { useEffect, useState } from "react";

const ExpenseForm = ({ onSave, selectedExpense }) => {

    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const [remarks, setRemarks] = useState("");

    useEffect(() => {

        if (selectedExpense) {

            setCategory(selectedExpense.category);
            setAmount(selectedExpense.amount);
            setExpenseDate(selectedExpense.expenseDate);
            setRemarks(selectedExpense.remarks || "");

        } else {

            clearForm();

        }

    }, [selectedExpense]);

    const clearForm = () => {

        setCategory("");
        setAmount("");
        setExpenseDate("");
        setRemarks("");

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const expense = {
            category,
            amount,
            expenseDate,
            remarks
        };

        onSave(expense);

        if (!selectedExpense) {
            clearForm();
        }
    };

    return (
        <div className="expense-form">

            <h2>
                {selectedExpense
                    ? "Update Expense"
                    : "Add Expense"}
            </h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Category</label>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="Food & Drinks">
                            Food & Drinks
                        </option>

                        <option value="Groceries">
                            Groceries
                        </option>

                        <option value="Rent / Accommodation">
                            Rent / Accommodation
                        </option>

                        <option value="Transport">
                            Transport
                        </option>

                        <option value="Bills & Recharge">
                            Bills & Recharge
                        </option>

                        <option value="Personal Care">
                            Personal Care
                        </option>

                        <option value="Healthcare">
                            Healthcare
                        </option>

                        <option value="Education">
                            Education
                        </option>

                        <option value="Shopping">
                            Shopping
                        </option>

                        <option value="Entertainment">
                            Entertainment
                        </option>

                        <option value="Family Support">
                            Family Support
                        </option>

                        <option value="Utilities">
                            Utilities
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>
                </div>

                <br />

                <div>
                    <label>Amount</label>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                        placeholder="Enter Amount"
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Expense Date</label>

                    <input
                        type="date"
                        value={expenseDate}
                        onChange={(e) =>
                            setExpenseDate(e.target.value)
                        }
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Remarks</label>

                    <textarea
                        value={remarks}
                        onChange={(e) =>
                            setRemarks(e.target.value)
                        }
                        placeholder="Remarks"
                        rows="3"
                    />
                </div>

                <br />

                <button type="submit">
                    {selectedExpense
                        ? "Update Expense"
                        : "Save Expense"}
                </button>

            </form>

        </div>
    );
};

export default ExpenseForm;