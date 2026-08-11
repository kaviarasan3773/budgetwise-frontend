import axios from "axios";

const BASE_URL = "http://localhost:8080/api/income";

const getToken = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const saveIncome = (income) => {
    return axios.post(BASE_URL, income, getToken());
};

export const getAllIncome = () => {
    return axios.get(BASE_URL, getToken());
};

export const updateIncome = (id, income) => {
    return axios.put(`${BASE_URL}/${id}`, income, getToken());
};

export const deleteIncome = (id) => {
    return axios.delete(`${BASE_URL}/${id}`, getToken());
};