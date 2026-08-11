import { useEffect, useState } from "react";

const IncomeForm = ({ onSave, selectedIncome }) => {

    const [incomeType, setIncomeType] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [amount, setAmount] = useState("");
    const [incomeDate, setIncomeDate] = useState("");
    const [incomeMonth, setIncomeMonth] = useState("");
    const [remarks, setRemarks] = useState("");

    useEffect(() => {

        if (selectedIncome) {

            setIncomeType(selectedIncome.incomeType);
            setSourceName(selectedIncome.sourceName);
            setAmount(selectedIncome.amount);
            setIncomeDate(selectedIncome.incomeDate);
            setIncomeMonth(selectedIncome.incomeMonth);
            setRemarks(selectedIncome.remarks);

        } else {

            clearForm();

        }

    }, [selectedIncome]);

    const clearForm = () => {

        setIncomeType("");
        setSourceName("");
        setAmount("");
        setIncomeDate("");
        setIncomeMonth("");
        setRemarks("");

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const income = {

            incomeType,
            sourceName,
            amount,
            incomeDate,
            incomeMonth,
            remarks

        };

        onSave(income);

        if (!selectedIncome) {
            clearForm();
        }
    };

    return (

        <div className="income-form">

            <h2>
                {selectedIncome ? "Update Income" : "Add Income"}
            </h2>

            <form onSubmit={handleSubmit}>

                <div>

                    <label>Income Type</label>

                    <select
                        value={incomeType}
                        onChange={(e) => setIncomeType(e.target.value)}
                        required
                    >

                        <option value="">Select Income Type</option>

                        <option value="Salary">Salary</option>

                        <option value="Business">Business</option>

                        <option value="Freelance">Freelance</option>

                        <option value="Rental">Rental</option>

                        <option value="Interest">Interest</option>

                        <option value="Bonus">Bonus</option>

                        <option value="Bonus">Family Support</option>

                        <option value="Bonus">Allowance</option>

                        <option value="Gift">Gift</option>

                        <option value="Other">Other</option>

                    </select>

                </div>

                <br />

                <div>

                    <label>Source Name</label>

                    <input
                        type="text"
                        value={sourceName}
                        onChange={(e) => setSourceName(e.target.value)}
                        placeholder="Enter Source Name"
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Amount</label>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Income Date</label>

                    <input
                        type="date"
                        value={incomeDate}
                        onChange={(e) => {

                            const selectedDate = e.target.value;

                            setIncomeDate(selectedDate);

                            if (selectedDate) {
                                setIncomeMonth(selectedDate.substring(0, 7));
                            }

                        }}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Income Month</label>

                    <input
                        type="month"
                        value={incomeMonth}
                        onChange={(e) => setIncomeMonth(e.target.value)}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Remarks</label>

                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Remarks"
                        rows="3"
                    />

                </div>

                <br />

                <button type="submit">

                    {selectedIncome ? "Update Income" : "Save Income"}

                </button>

            </form>

        </div>

    );
};

export default IncomeForm;