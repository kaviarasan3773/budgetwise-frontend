import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import IncomeForm from "../components/IncomeForm";
import IncomeTable from "../components/IncomeTable";

import {
    saveIncome,
    getAllIncome,
    updateIncome,
    deleteIncome
} from "../services/incomeService";

const Income = () => {

    const [incomeList, setIncomeList] = useState([]);

    const [selectedIncome, setSelectedIncome] = useState(null);

    useEffect(() => {
        loadIncome();
    }, []);

    const loadIncome = () => {

        getAllIncome()
            .then(response => {

                setIncomeList(response.data);

            })
            .catch(error => {

                console.error(error);

                toast.error("Unable to load income details.");

            });

    };

    const handleSave = (income) => {

        if (selectedIncome) {

            updateIncome(selectedIncome.incomeId, income)
                .then(() => {

                    toast.success("Income updated successfully");

                    setSelectedIncome(null);

                    loadIncome();

                })
                .catch(error => {

                    console.error(error);

                    if (error.response) {
                        toast.error(error.response.data);
                    } else {
                        toast.error("Unable to update income.");
                    }

                });

        } else {

            saveIncome(income)
                .then(() => {

                    toast.success("Income added successfully");

                    loadIncome();

                })
                .catch(error => {

                    console.error(error);

                    if (error.response) {
                        toast.error(error.response.data);
                    } else {
                        toast.error("Unable to save income.");
                    }

                });

        }

    };

    const handleEdit = (income) => {

        setSelectedIncome(income);

    };

    const handleDelete = (incomeId) => {

        if (!window.confirm("Are you sure you want to delete this income?")) {
            return;
        }

        deleteIncome(incomeId)
            .then(() => {

                toast.success("Income deleted successfully");

                loadIncome();

            })
            .catch(error => {

                console.error(error);

                if (error.response) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Unable to delete income.");
                }

            });

    };

    return (

        <div className="income-page">

            <IncomeForm
                onSave={handleSave}
                selectedIncome={selectedIncome}
            />

            <br />

            <IncomeTable
                incomeList={incomeList}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

        </div>

    );

};

export default Income;