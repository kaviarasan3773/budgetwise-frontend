import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";

import {
    saveExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense
} from "../services/expenseService";

const Expenses = () => {

    const [expenseList, setExpenseList] = useState([]);

    const [selectedExpense, setSelectedExpense] =
        useState(null);

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = () => {

        getAllExpenses()
            .then(response => {

                setExpenseList(response.data);

            })
            .catch(error => {

                console.error(error);

                if (error.response) {
                    toast.error(error.response.data);
                } else {
                    toast.error(
                        "Unable to load expense details."
                    );
                }

            });
    };

    const handleSave = (expense) => {

        if (selectedExpense) {

            updateExpense(
                selectedExpense.expenseId,
                expense
            )
                .then(() => {

                    toast.success(
                        "Expense updated successfully"
                    );

                    setSelectedExpense(null);

                    loadExpenses();

                })
                .catch(error => {

                    console.error(error);

                    if (error.response) {
                        toast.error(error.response.data);
                    } else {
                        toast.error(
                            "Unable to update expense."
                        );
                    }

                });

        } else {

            saveExpense(expense)
                .then(() => {

                    toast.success(
                        "Expense added successfully"
                    );

                    loadExpenses();

                })
                .catch(error => {

                    console.error(error);

                    if (error.response) {
                        toast.error(error.response.data);
                    } else {
                        toast.error(
                            "Unable to save expense."
                        );
                    }

                });
        }
    };

    const handleEdit = (expense) => {

        setSelectedExpense(expense);

    };

    const handleDelete = (expenseId) => {

        if (!window.confirm(
            "Are you sure you want to delete this expense?"
        )) {
            return;
        }

        deleteExpense(expenseId)
            .then(() => {

                toast.success(
                    "Expense deleted successfully"
                );

                loadExpenses();

            })
            .catch(error => {

                console.error(error);

                if (error.response) {
                    toast.error(error.response.data);
                } else {
                    toast.error(
                        "Unable to delete expense."
                    );
                }

            });
    };

    return (

        <div className="expenses-page">

            <ExpenseForm
                onSave={handleSave}
                selectedExpense={selectedExpense}
            />

            <br />

            <ExpenseTable
                expenseList={expenseList}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

        </div>
    );
};

export default Expenses;