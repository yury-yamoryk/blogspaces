import ThemeService from "../services/ThemeService";
import { GET_THEMES } from "./types";

export const getThemes = () => async (dispatch) => {
    try {
        const getThemesResponse = await ThemeService.getAll();

        dispatch({
            type: GET_THEMES,
            getThemesResponse
        });

        return getThemesResponse;
    } catch (error) {
        console.log(error);
    }
};