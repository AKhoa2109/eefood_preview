import axiosInstance from "./axiosClient";

export const getRecipeById = (id) => axiosInstance.get(`/recipes/${id}`);