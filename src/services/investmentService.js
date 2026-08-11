import axios from "axios";

const BASE_URL = "http://localhost:8080/api/investments";

const getConfig = () => ({
    headers: {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`
    }
});

export const saveInvestment = (investment) => {
    return axios.post(
        BASE_URL,
        investment,
        getConfig()
    );
};

export const getAllInvestments = () => {
    return axios.get(
        BASE_URL,
        getConfig()
    );
};

export const updateInvestment = (
    investmentId,
    investment
) => {
    return axios.put(
        `${BASE_URL}/${investmentId}`,
        investment,
        getConfig()
    );
};

export const deleteInvestment = (investmentId) => {
    return axios.delete(
        `${BASE_URL}/${investmentId}`,
        getConfig()
    );
};