import axios from "axios";
import { getFormDataFromPlainObj } from "../utils";

const baseURL = 'http://localhost:5000/api/'

const api = new axios.create({
    baseURL
});

export const QuizzesApi = {
    getQuizzes: () => api.get('quiz'),
    createQuiz: payload => {
        const formData = getFormDataFromPlainObj(payload);

        return api.post('quiz', formData);
    },
};

export const ThemesApi = {
    getThemes: () => api.get('theme'),
    getThemeBySlug: slug => api.get(`theme/${slug}`),
    createTheme: (data, author) => {
        const tempData = {...data, author};
        const formData = getFormDataFromPlainObj(tempData);

        return api.post('theme', formData);
    },
};

export const AuthApi = {
    login: payload => api.post('auth/login', {...payload}),
    registration: payload => api.post('auth/registration', {...payload}),
};