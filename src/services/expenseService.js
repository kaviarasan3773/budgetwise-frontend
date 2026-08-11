import axios from "axios";

const BASE_URL = "http://localhost:8080/api/expenses";

const getConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const saveExpense = (expense) => {
    return axios.post(
        BASE_URL,
        expense,
        getConfig()
    );
};

export const getAllExpenses = () => {
    return axios.get(
        BASE_URL,
        getConfig()
    );
};

export const updateExpense = (expenseId, expense) => {
    return axios.put(
        `${BASE_URL}/${expenseId}`,
        expense,
        getConfig()
    );
};

export const deleteExpense = (expenseId) => {
    return axios.delete(
        `${BASE_URL}/${expenseId}`,
        getConfig()
    );
};