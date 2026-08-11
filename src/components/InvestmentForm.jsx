import { useEffect, useState } from "react";

const InvestmentForm = ({
    onSave,
    selectedInvestment
}) => {

    const [investmentType, setInvestmentType] =
        useState("");

    const [investmentName, setInvestmentName] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [investmentDate, setInvestmentDate] =
        useState("");

    const [remarks, setRemarks] =
        useState("");

    useEffect(() => {

        if (selectedInvestment) {

            setInvestmentType(
                selectedInvestment.investmentType
            );

            setInvestmentName(
                selectedInvestment.investmentName
            );

            setAmount(
                selectedInvestment.amount
            );

            setInvestmentDate(
                selectedInvestment.investmentDate
            );

            setRemarks(
                selectedInvestment.remarks || ""
            );

        } else {

            clearForm();

        }

    }, [selectedInvestment]);

    const clearForm = () => {

        setInvestmentType("");
        setInvestmentName("");
        setAmount("");
        setInvestmentDate("");
        setRemarks("");
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const investment = {
            investmentType,
            investmentName,
            amount,
            investmentDate,
            remarks
        };

        onSave(investment);

        if (!selectedInvestment) {
            clearForm();
        }
    };

    return (
        <div className="investment-form">

            <h2>
                {selectedInvestment
                    ? "Update Investment"
                    : "Add Investment"}
            </h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Investment Type
                    </label>

                    <select
                        value={investmentType}
                        onChange={(e) =>
                            setInvestmentType(
                                e.target.value
                            )
                        }
                        required
                    >
                        <option value="">
                            Select Investment Type
                        </option>

                        <option value="Mutual Fund">
                            Mutual Fund
                        </option>

                        <option value="Stocks">
                            Stocks
                        </option>

                        <option value="FD">
                            Fixed Deposit
                        </option>

                        <option value="RD">
                            Recurring Deposit
                        </option>

                        <option value="Gold">
                            Gold
                        </option>

                        <option value="PPF">
                            PPF
                        </option>

                        <option value="NPS">
                            NPS
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>
                </div>

                <br />

                <div>
                    <label>
                        Investment Name
                    </label>

                    <input
                        type="text"
                        value={investmentName}
                        onChange={(e) =>
                            setInvestmentName(
                                e.target.value
                            )
                        }
                        placeholder="Enter investment name"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>
                        Amount
                    </label>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                        placeholder="Enter amount"
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>
                        Investment Date
                    </label>

                    <input
                        type="date"
                        value={investmentDate}
                        onChange={(e) =>
                            setInvestmentDate(
                                e.target.value
                            )
                        }
                        required
                    />
                </div>

                <br />

                <div>
                    <label>
                        Remarks
                    </label>

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
                    {selectedInvestment
                        ? "Update Investment"
                        : "Save Investment"}
                </button>

            </form>

        </div>
    );
};

export default InvestmentForm;