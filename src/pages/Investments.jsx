import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import InvestmentForm from "../components/InvestmentForm";
import InvestmentTable from "../components/InvestmentTable";

import {
    saveInvestment,
    getAllInvestments,
    updateInvestment,
    deleteInvestment
} from "../services/investmentService";

const Investments = () => {

    const [investmentList, setInvestmentList] =
        useState([]);

    const [selectedInvestment, setSelectedInvestment] =
        useState(null);

    useEffect(() => {
        loadInvestments();
    }, []);

    const loadInvestments = () => {

        getAllInvestments()
            .then(response => {

                setInvestmentList(response.data);

            })
            .catch(error => {

                console.error(error);

                if (error.response) {
                    toast.error(error.response.data);
                } else {
                    toast.error(
                        "Unable to load investment details."
                    );
                }
            });
    };

    const handleSave = (investment) => {

        if (selectedInvestment) {

            updateInvestment(
                selectedInvestment.investmentId,
                investment
            )
                .then(() => {

                    toast.success(
                        "Investment updated successfully"
                    );

                    setSelectedInvestment(null);

                    loadInvestments();

                })
                .catch(error => {

                    console.error(error);

                    if (error.response) {
                        toast.error(
                            error.response.data
                        );
                    } else {
                        toast.error(
                            "Unable to update investment."
                        );
                    }
                });

        } else {

            saveInvestment(investment)
                .then(() => {

                    toast.success(
                        "Investment added successfully"
                    );

                    loadInvestments();

                })
                .catch(error => {

                    console.error(error);

                    if (error.response) {
                        toast.error(
                            error.response.data
                        );
                    } else {
                        toast.error(
                            "Unable to save investment."
                        );
                    }
                });
        }
    };

    const handleEdit = (investment) => {

        setSelectedInvestment(investment);
    };

    const handleDelete = (investmentId) => {

        if (!window.confirm(
            "Are you sure you want to delete this investment?"
        )) {
            return;
        }

        deleteInvestment(investmentId)
            .then(() => {

                toast.success(
                    "Investment deleted successfully"
                );

                loadInvestments();

            })
            .catch(error => {

                console.error(error);

                if (error.response) {
                    toast.error(
                        error.response.data
                    );
                } else {
                    toast.error(
                        "Unable to delete investment."
                    );
                }
            });
    };

    return (
        <div className="investments-page">

            <InvestmentForm
                onSave={handleSave}
                selectedInvestment={
                    selectedInvestment
                }
            />

            <br />

            <InvestmentTable
                investmentList={investmentList}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

        </div>
    );
};

export default Investments;