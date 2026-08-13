import { useEffect, useState } from "react";

import DashboardCard from "../components/DashboardCard";
import ExpenseCategoryChart from "../components/ExpenseCategoryChart";
import FinancialOverviewChart from "../components/FinancialOverviewChart";
import RecentTransactions from "../components/RecentTransactions";

import {
    getDashboardSummary,getExpenseCategorySummary,
    getFinancialOverview,getRecentTransactions
} from "../services/dashboardService";


import { toast } from "react-toastify";

import "./Dashboard.css";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null);
    const [period, setPeriod] = useState("THIS_MONTH");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [expenseCategoryData, setExpenseCategoryData] = useState([]);
    const [financialOverviewData, setFinancialOverviewData] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);


    const loadDashboard = () => {

    setLoading(true);
    setDashboard(null);

    Promise.all([

        getDashboardSummary(
            period,
            fromDate,
            toDate
        ),

        getExpenseCategorySummary(
            period,
            fromDate,
            toDate
        ),

        getFinancialOverview(
            period,
            fromDate,
            toDate
        ),

        getRecentTransactions(
        period,
        fromDate,
        toDate
    )

    ])
        .then(
            ([
                dashboardResponse,
                categoryResponse,
                financialResponse,
                recentResponse
            ]) => {

                setDashboard(
                    dashboardResponse.data
                );

                setExpenseCategoryData(
                    categoryResponse.data
                );

                setFinancialOverviewData(
                    financialResponse.data
                );

                setRecentTransactions(
                    recentResponse.data
                );
            }
        )
        .catch(error => {

            console.error(
                "Dashboard API Error:",
                error
            );

            toast.error(
                "Unable to load dashboard."
            );

        })
        .finally(() => {

            setLoading(false);

        });
};


    useEffect(() => {

        // Normal periods
        if (period !== "CUSTOM") {

            loadDashboard();

            return;
        }


        // Custom range - wait for both dates
        if (!fromDate || !toDate) {

            return;
        }


        // Invalid custom range
        if (fromDate > toDate) {

            toast.error(
                "From date cannot be greater than To date."
            );

            setDashboard(null);

            setExpenseCategoryData([]);

            setFinancialOverviewData([]);

            setRecentTransactions([]);

            return;
        }


        // Valid custom range
        loadDashboard();

    }, [period, fromDate, toDate]);


    const handlePeriodChange = (e) => {

        const selectedPeriod = e.target.value;

        setPeriod(selectedPeriod);

        if (selectedPeriod !== "CUSTOM") {

            setFromDate("");
            setToDate("");

        }

    };


    if (loading && !dashboard) {

        return (
            <div className="dashboard-loading">
                <h2>Loading Dashboard...</h2>
            </div>
        );
    }

    const invalidCustomRange =
        period === "CUSTOM" &&
        fromDate &&
        toDate &&
        fromDate > toDate;

    return (

        <div className="dashboard-page">

            {/* =========================
                WELCOME SECTION
               ========================= */}

            <div className="dashboard-welcome">

                <div>
                    <h1>
                        Welcome back! 👋
                    </h1>

                    <p>
                        Here's what's happening
                        with your finances.
                    </p>
                </div>

            </div>


            {/* =========================
                PERIOD FILTER
               ========================= */}

            <div className="dashboard-filter">

                <div className="filter-title">
                    Financial Period
                </div>

                <div className="filter-controls">

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
                                onChange={(e) =>
                                    setFromDate(
                                        e.target.value
                                    )
                                }
                            />

                            <span>to</span>

                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) =>
                                    setToDate(
                                        e.target.value
                                    )
                                }
                            />

                        </>

                    )}

                </div>

            </div>


            {/* =========================
                SUMMARY CARDS
               ========================= */}

            {loading ? (

                <div className="dashboard-loading-small">
                    Loading...
                </div>

            ) : invalidCustomRange ? (

                <div className="dashboard-invalid-range">
                    Please select a valid date range.
                </div>

            )  : dashboard && (

                <>

                    <div className="dashboard-cards">


                        <DashboardCard
                            title="Total Income"
                            value={
                                dashboard.totalIncome
                            }
                            type="income"
                        />


                        <DashboardCard
                            title="Total Expenses"
                            value={
                                dashboard.totalExpenses
                            }
                            type="expense"
                        />


                        <DashboardCard
                            title="Net Savings"
                            value={
                                dashboard.totalSavings
                            }
                            type="savings"
                        />


                        <DashboardCard
                            title="Total Investments"
                            value={
                                dashboard.totalInvestments
                            }
                            type="investment"
                        />


                        <DashboardCard
                            title="Net Cash Flow"
                            value={
                                dashboard
                                    .netCashFlowAfterInvestments
                            }
                            type="cashflow"
                        />


                        <DashboardCard
                            title="Savings %"
                            value={
                                dashboard
                                    .savingsPercentage
                                + "%"
                            }
                            type="percentage"
                        />


                        <DashboardCard
                            title="Investment %"
                            value={
                                dashboard
                                    .investmentPercentage
                                + "%"
                            }
                            type="percentage"
                        />

                    </div>


                    {/* =========================
                        EXPENSE SUMMARY
                       ========================= */}

                    <div className="dashboard-section">

                        <div className="section-header">

                            <h2>
                                Expense Overview
                            </h2>

                        </div>

                        <div className="expense-overview">

                            <div className="expense-summary-card">

                                <h3>
                                    Highest Expense Category
                                </h3>

                                <div className="expense-value">
                                    {dashboard.highestExpenseCategory}
                                </div>

                                <p>
                                    ₹{dashboard.highestCategoryExpenseAmount}
                                </p>

                            </div>


                            <div className="expense-summary-card">

                                <h3>
                                    Total Expense Transactions
                                </h3>

                                <div className="expense-value">
                                    {dashboard.totalExpenseTransactions}
                                </div>

                                <p>
                                    transactions
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        YEARLY ANALYTICS
                       ========================= */}

                    {period === "THIS_YEAR" && (

                        <div className="dashboard-section">

                            <div className="section-header">

                                <h2>
                                    Yearly Analysis
                                </h2>

                            </div>


                            <div className="analytics-grid">

                                <div className="analytics-card">

                                    <span>
                                        Average Monthly Expense
                                    </span>

                                    <strong>
                                        ₹
                                        {
                                            dashboard
                                                .avgMonthlyExpense
                                        }
                                    </strong>

                                </div>


                                <div className="analytics-card">

                                    <span>
                                        Average Monthly Savings
                                    </span>

                                    <strong>
                                        ₹
                                        {
                                            dashboard
                                                .avgMonthlySavings
                                        }
                                    </strong>

                                </div>


                                <div className="analytics-card">

                                    <span>
                                        Top Saving Month
                                    </span>

                                    <strong>
                                        {
                                            dashboard
                                                .topSavingMonth
                                            || "No data"
                                        }
                                    </strong>

                                </div>


                                <div className="analytics-card">

                                    <span>
                                        Top Saving Amount
                                    </span>

                                    <strong>
                                        ₹
                                        {
                                            dashboard
                                                .topSavingAmount
                                        }
                                    </strong>

                                </div>

                                <div className="analytics-card">

                                    <span>
                                        Highest Expense Month
                                    </span>

                                    <strong>
                                        {
                                             dashboard
                                                 .highestExpenseMonth || "No data"
                                        }
                                    </strong>
                                </div>

                                <div className="analytics-card">

                                    <span>
                                        Highest Expense Amount
                                    </span>

                                    <strong>
                                        ₹
                                        {
                                             dashboard
                                                .highestExpenseMonthlyAmount 
                                        }
                                    </strong>
                                </div>

                            </div>


                        </div>

                    )}


                    {/* =========================
                        CHART PLACEHOLDERS
                       ========================= */}

                    <div className="dashboard-chart-grid">

                        {/* =========================
                            EXPENSE BY CATEGORY
                        ========================= */}

                        <div className="chart-card">

                            <div className="chart-header">

                                <h2>
                                    Expense by Category
                                </h2>

                            </div>

                            <ExpenseCategoryChart
                                data={expenseCategoryData}
                            />

                        </div>


                        {/* =========================
                            FINANCIAL OVERVIEW
                        ========================= */}

                        <div className="chart-card">

                            <div className="chart-header">

                                <h2>
                                    Financial Overview
                                </h2>

                            </div>

                            <FinancialOverviewChart
                                data={financialOverviewData}
                            />

                        </div>

                    </div>

                            {/* =========================
                                    RECENT TRANSACTIONS
                                ========================= */}


                    <div className="dashboard-section">

                        <div className="section-header">

                            <h2>
                                Recent Transactions
                            </h2>

                        </div>

                        <RecentTransactions
                            transactions={recentTransactions}
                        />

                    </div>

                </>

            )}

        </div>
    );
};

export default Dashboard;