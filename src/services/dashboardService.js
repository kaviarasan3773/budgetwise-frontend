import axios from "axios";

const BASE_URL =
    "http://localhost:8080/api/dashboard";

const getConfig = () => ({
    headers: {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`
    }
});

export const getDashboardSummary = (
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
        BASE_URL,
        {
            ...getConfig(),
            params: params
        }
    );
};

export const getExpenseCategorySummary = (
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

export const getFinancialOverview = (
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
        `${BASE_URL}/financial-overview`,
        {
            ...getConfig(),
            params: params
        }
    );
};

export const getRecentTransactions = (
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
        `${BASE_URL}/recent-transactions`,
        {
            ...getConfig(),
            params: params
        }
    );
};