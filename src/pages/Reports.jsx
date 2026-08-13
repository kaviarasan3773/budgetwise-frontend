import { useEffect, useState } from "react";

import {
    getReportSummary,
    getExpenseCategoryReport,
    getIncomeSourceReport,
    getMonthlyReport,
    getReportTransactions
} from "../services/reportService";

import "./Reports.css";

import { toast } from "react-toastify";


const Reports = () => {

    // =====================================================
    // FILTER
    // =====================================================

    const [period, setPeriod] = useState("THIS_MONTH");

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");


    // =====================================================
    // REPORT DATA
    // =====================================================

    const [summary, setSummary] = useState(null);

    const [expenseCategories, setExpenseCategories] =
        useState([]);

    const [incomeSources, setIncomeSources] =
        useState([]);

    const [monthlyData, setMonthlyData] =
        useState([]);

    const [transactions, setTransactions] =
        useState([]);


    // =====================================================
    // UI STATE
    // =====================================================

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // PAGINATION
    // =====================================================

    const [currentPage, setCurrentPage] = useState(1);

    const transactionsPerPage = 10;


    // =====================================================
    // LOAD REPORTS
    // =====================================================

    const loadReports = async () => {

        try {

            setLoading(true);

            setError("");


            const summaryResponse =
                await getReportSummary(
                    period,
                    fromDate,
                    toDate
                );


            const expenseResponse =
                await getExpenseCategoryReport(
                    period,
                    fromDate,
                    toDate
                );


            const incomeResponse =
                await getIncomeSourceReport(
                    period,
                    fromDate,
                    toDate
                );


            /*
             * Monthly report is generally useful for
             * THIS_YEAR.
             *
             * If the selected period is THIS_MONTH,
             * request THIS_YEAR so that the monthly
             * trend can still show the year's data.
             */
            const monthlyResponse =
                await getMonthlyReport(
                    "THIS_YEAR",
                    null,
                    null
                );


            const transactionResponse =
                await getReportTransactions(
                    period,
                    fromDate,
                    toDate
                );


            // =================================================
            // SET RESPONSE DATA
            // =================================================

            setSummary(
                summaryResponse.data
            );


            setExpenseCategories(
                expenseResponse.data
            );


            setIncomeSources(
                incomeResponse.data
            );


            setMonthlyData(
                monthlyResponse.data
            );


            setTransactions(
                transactionResponse.data
            );


            // Always start from page 1 after new data loads
            setCurrentPage(1);


        } catch (err) {

            console.error(
                "Error loading reports:",
                err
            );

            setError(
                "Unable to load report data."
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // LOAD WHEN FILTER CHANGES
    // =====================================================

    useEffect(() => {

        if (period !== "CUSTOM") {
            loadReports();
            return;
        }

        // Wait until both dates are selected
        if (!fromDate || !toDate) {
            return;
        }

        // Invalid date range
        if (fromDate > toDate) {

            toast.error(
                "From date cannot be greater than To date."
            );

            // Clear stale data
            setSummary(null);
            setExpenseCategories([]);
            setIncomeSources([]);
            setTransactions([]);
            setCurrentPage(1);

            return;
        }

        // Valid custom range
        loadReports();

    }, [period, fromDate, toDate]);


    // =====================================================
    // PERIOD CHANGE
    // =====================================================

    const handlePeriodChange = (event) => {

        const selectedPeriod =
            event.target.value;


        setPeriod(selectedPeriod);

        setCurrentPage(1);


        /*
         * Clear custom dates when the user
         * selects a normal predefined period.
         */
        if (selectedPeriod !== "CUSTOM") {

            setFromDate("");

            setToDate("");

        }

    };


    // =====================================================
    // PAGINATION CALCULATION
    // =====================================================

    const totalPages =
        Math.ceil(
            transactions.length /
            transactionsPerPage
        );


    const startIndex =
        (currentPage - 1) *
        transactionsPerPage;


    const currentTransactions =
        transactions.slice(
            startIndex,
            startIndex + transactionsPerPage
        );

    const monthlyMaxValue = Math.max(
        ...monthlyData.flatMap(item => [
            Number(item.income || 0),
            Number(item.expenses || 0),
            Number(item.investments || 0),
            Number(item.savings || 0)
        ]),
        1
    );


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="reports-page">

                <div className="reports-loading">

                    Loading reports...

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="reports-page">

                <div className="reports-error">

                    {error}

                </div>

            </div>

        );

    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="reports-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="reports-header">

                <div>

                    <h1>
                        Financial Reports
                    </h1>

                    <p>
                        Analyze your income, expenses,
                        investments and savings.
                    </p>

                </div>


                {/* =================================================
                    PERIOD FILTER
                ================================================= */}

                <div className="reports-filter">

                    <select
                        value={period}
                        onChange={handlePeriodChange}
                    >

                        <option value="TODAY">
                            Today
                        </option>

                        <option value="THIS_WEEK">
                            This Week
                        </option>

                        <option value="THIS_MONTH">
                            This Month
                        </option>

                        <option value="LAST_MONTH">
                            Last Month
                        </option>

                        <option value="THIS_YEAR">
                            This Year
                        </option>

                        <option value="CUSTOM">
                            Custom Range
                        </option>

                    </select>


                    {period === "CUSTOM" && (

                        <>

                            <input
                                type="date"
                                value={fromDate}
                                onChange={(event) =>
                                    setFromDate(
                                        event.target.value
                                    )
                                }
                            />


                            <input
                                type="date"
                                value={toDate}
                                onChange={(event) =>
                                    setToDate(
                                        event.target.value
                                    )
                                }
                            />

                        </>

                    )}

                </div>

            </div>


            {/* =================================================
                FINANCIAL SUMMARY
            ================================================= */}

            {summary && (

                <section className="report-section">

                    <div className="section-header">

                        <h2>
                            Financial Summary
                        </h2>

                    </div>


                    <div className="report-summary-grid">


                        {/* TOTAL INCOME */}

                        <div className="report-summary-card income">

                            <span>
                                Total Income
                            </span>

                            <strong>
                                ₹{summary.totalIncome}
                            </strong>

                        </div>


                        {/* TOTAL EXPENSES */}

                        <div className="report-summary-card expense">

                            <span>
                                Total Expenses
                            </span>

                            <strong>
                                ₹{summary.totalExpenses}
                            </strong>

                        </div>


                        {/* TOTAL INVESTMENTS */}

                        <div className="report-summary-card investment">

                            <span>
                                Total Investments
                            </span>

                            <strong>
                                ₹{summary.totalInvestments}
                            </strong>

                        </div>


                        {/* NET SAVINGS */}

                        <div className="report-summary-card savings">

                            <span>
                                Net Savings
                            </span>

                            <strong>
                                ₹{summary.netSavings}
                            </strong>

                        </div>


                        {/* CASH FLOW */}

                        <div className="report-summary-card cashflow">

                            <span>
                                Cash Flow After Investment
                            </span>

                            <strong>
                                ₹{summary.netCashFlowAfterInvestments}
                            </strong>

                        </div>


                        {/* SAVINGS PERCENTAGE */}

                        <div className="report-summary-card percentage">

                            <span>
                                Savings %
                            </span>

                            <strong>
                                {summary.savingsPercentage}%
                            </strong>

                        </div>


                        {/* INVESTMENT PERCENTAGE */}

                        <div className="report-summary-card investment-percentage">

                            <span>
                                Investment %
                            </span>

                            <strong>
                                {summary.investmentPercentage}%
                            </strong>

                        </div>


                    </div>

                </section>

            )}


            {/* =================================================
                EXPENSE + INCOME ANALYSIS
            ================================================= */}

            <section className="report-section">

                <div className="report-analysis-grid">


                    {/* =================================================
                        EXPENSE ANALYSIS
                    ================================================= */}

                    <div className="report-panel">

                        <div className="panel-header">

                            <h2>
                                Expense Analysis
                            </h2>

                        </div>


                        <div className="report-list">

                            {expenseCategories.length === 0 ? (

                                <p className="empty-message">

                                    No expense data available.

                                </p>

                            ) : (

                                expenseCategories.map(
                                    (item, index) => (

                                        <div
                                            className="report-list-row"
                                            key={index}
                                        >

                                            <span>
                                                {item.category}
                                            </span>

                                            <strong>
                                                ₹{item.amount}
                                            </strong>

                                        </div>

                                    )
                                )

                            )}

                        </div>

                    </div>


                    {/* =================================================
                        INCOME ANALYSIS
                    ================================================= */}

                    <div className="report-panel">

                        <div className="panel-header">

                            <h2>
                                Income Analysis
                            </h2>

                        </div>


                        <div className="report-list">

                            {incomeSources.length === 0 ? (

                                <p className="empty-message">

                                    No income data available.

                                </p>

                            ) : (

                                incomeSources.map(
                                    (item, index) => (

                                        <div
                                            className="report-list-row"
                                            key={index}
                                        >

                                            <span>
                                                {item.source}
                                            </span>

                                            <strong>
                                                ₹{item.amount}
                                            </strong>

                                        </div>

                                    )
                                )

                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                MONTHLY FINANCIAL TREND
            ================================================= */}

            <section className="report-section">

                <div className="section-header">
                    <h2>Monthly Financial Trend</h2>
                </div>

                {monthlyData.length === 0 ? (

                    <div className="empty-message">
                        No monthly financial data available.
                    </div>

                ) : (

                    <div className="monthly-chart-container">

                        <div className="monthly-chart">

                            {monthlyData.map((item, index) => {

                                const income = Number(item.income || 0);
                                const expenses = Number(item.expenses || 0);
                                const investments = Number(item.investments || 0);
                                const savings = Number(item.savings || 0);

                                return (
                                    <div
                                        className="monthly-chart-column"
                                        key={index}
                                    >

                                        <div className="monthly-bars">

                                            <div
                                                className="monthly-bar income-bar"
                                                style={{
                                                    height: `${(income / monthlyMaxValue) * 100}%`
                                                }}
                                                title={`Income: ₹${income}`}
                                            />

                                            <div
                                                className="monthly-bar expense-bar"
                                                style={{
                                                    height: `${(expenses / monthlyMaxValue) * 100}%`
                                                }}
                                                title={`Expenses: ₹${expenses}`}
                                            />

                                            <div
                                                className="monthly-bar investment-bar"
                                                style={{
                                                    height: `${(investments / monthlyMaxValue) * 100}%`
                                                }}
                                                title={`Investments: ₹${investments}`}
                                            />

                                            <div
                                                className="monthly-bar savings-bar"
                                                style={{
                                                    height: `${(savings / monthlyMaxValue) * 100}%`
                                                }}
                                                title={`Savings: ₹${savings}`}
                                            />

                                        </div>

                                        <div className="monthly-label">
                                            {item.month}
                                        </div>

                                    </div>
                                );

                            })}

                        </div>


                        <div className="monthly-chart-legend">

                            <div className="legend-item">
                                <span className="legend-color income-color"></span>
                                Income
                            </div>

                            <div className="legend-item">
                                <span className="legend-color expense-color"></span>
                                Expenses
                            </div>

                            <div className="legend-item">
                                <span className="legend-color investment-color"></span>
                                Investments
                            </div>

                            <div className="legend-item">
                                <span className="legend-color savings-color"></span>
                                Savings
                            </div>

                        </div>

                    </div>

                )}

            </section>


            {/* =================================================
                TRANSACTION DETAILS
            ================================================= */}

            <section className="report-section">

                <div className="section-header">

                    <h2>
                        Transaction Details
                    </h2>

                </div>


                {transactions.length === 0 ? (

                    <div className="empty-message">

                        No transactions found
                        for the selected period.

                    </div>

                ) : (

                    <>

                        <div className="report-table-container">

                            <table className="report-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Description
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {currentTransactions.map(
                                        (transaction, index) => (

                                            <tr
                                                key={index}
                                            >

                                                <td>
                                                    {transaction.date}
                                                </td>


                                                <td>
                                                    {transaction.description}
                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            `transaction-type ${transaction.type.toLowerCase()}`
                                                        }
                                                    >

                                                        {
                                                            transaction.type
                                                        }

                                                    </span>

                                                </td>


                                                <td className="amount-cell">

                                                    ₹
                                                    {transaction.amount}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* =================================================
                            PAGINATION
                        ================================================= */}

                        {totalPages > 1 && (

                            <div className="pagination">

                                <button
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage - 1
                                        )
                                    }
                                    disabled={
                                        currentPage === 1
                                    }
                                >
                                    Previous
                                </button>


                                <span>

                                    Page {currentPage}
                                    {" "}
                                    of
                                    {" "}
                                    {totalPages}

                                </span>


                                <button
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage + 1
                                        )
                                    }
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                >
                                    Next
                                </button>

                            </div>

                        )}

                    </>

                )}

            </section>


        </div>

    );

};


export default Reports;