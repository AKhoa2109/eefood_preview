import { getRecipeById as fetchRecipeById } from "../api/recipeApi";

/**
 * Lấy chi tiết công thức và chuẩn hóa dữ liệu trả về
 * @param {number|string} id
 * @returns {Promise<RecipeResponse>}
 */
export const getRecipeDetail = async (id) => {
    const response = await fetchRecipeById(id);
    return response.data?.data ?? response.data;
};

/**
 * Tính tổng thời gian nấu
 * @param {number} prepTime
 * @param {number} cookTime
 * @returns {string}
 */
export const formatTotalTime = (prepTime = 0, cookTime = 0) => {
    const total = prepTime + cookTime;
    if (total < 60) return `${total} phút`;
    const h = Math.floor(total / 60);
    const m = total % 60;
    return m > 0 ? `${h} giờ ${m} phút` : `${h} giờ`;
};

/**
 * Map difficulty enum sang label + màu
 */
export const difficultyMap = {
    EASY: {
        label: "Dễ",
        bg: "bg-emerald-500/20",
        border: "border-emerald-400/30",
        color: "text-emerald-200",
        dot: "bg-emerald-400",
    },
    MEDIUM: {
        label: "Trung bình",
        bg: "bg-yellow-500/20",
        border: "border-yellow-400/30",
        color: "text-yellow-200",
        dot: "bg-yellow-400",
    },
    HARD: {
        label: "Khó",
        bg: "bg-rose-500/20",
        border: "border-rose-400/30",
        color: "text-rose-200",
        dot: "bg-rose-400",
    },
};