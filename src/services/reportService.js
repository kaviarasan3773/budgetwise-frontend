import axios from "axios";

const BASE_URL =
    "http://localhost:8080/api/reports";


const getConfig = () => ({
    headers: {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`
    }
});


export const getReportSummary = (
    period = "THIS_MONTH",
    fromDate = null,
    toDate = null
) => {

    const params = {
        period: period
    };

    if (period === "CUSTOM") {

        params.fromDate = fromDate;
        params.toDate = toDate;

    }

    return axios.get(
        `${BASE_URL}/summary`,
        {
            ...getConfig(),
            params: params
        }
    );
};


export const getExpenseCategoryReport = (
    period = "THIS_MONTH",
    fromDate = null,
    toDate = null
) => {

    const params = {
        period: period
    };

    if (period === "CUSTOM") {

        params.fromDate = fromDate;
        params.toDate = toDate;

    }

    return axios.get(
        `${BASE_URL}/expense-categories`,
        {
            ...getConfig(),
            params: params
        }
    );
};


export const getIncomeSourceReport = (
    period = "THIS_MONTH",
    fromDate = null,
    toDate = null
) => {

    const params = {
        period: period
    };

    if (period === "CUSTOM") {

        params.fromDate = fromDate;
        params.toDate = toDate;

    }

    return axios.get(
        `${BASE_URL}/income-sources`,
        {
            ...getConfig(),
            params: params
        }
    );
};


export const getMonthlyReport = (
    period = "THIS_YEAR",
    fromDate = null,
    toDate = null
) => {

    const params = {
        period: period
    };

    if (period === "CUSTOM") {

        params.fromDate = fromDate;
        params.toDate = toDate;

    }

    return axios.get(
        `${BASE_URL}/monthly`,
        {
            ...getConfig(),
            params: params
        }
    );
};


export const getReportTransactions = (
    period = "THIS_MONTH",
    fromDate = null,
    toDate = null
) => {

    const params = {
        period: period
    };

    if (period === "CUSTOM") {

        params.fromDate = fromDate;
        params.toDate = toDate;

    }

    return axios.get(
        `${BASE_URL}/transactions`,
        {
            ...getConfig(),
            params: params
        }
    );
};