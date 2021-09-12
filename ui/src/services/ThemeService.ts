import Theme from "../entities/Theme";
import http from "./HttpService";

const getAll: () => Promise<{ themes: Theme[] }>
= async () => {
    const httpResponse: any = await http.get("/spaces/themes");
    const getThemesResponse: {themes: Theme[]} = httpResponse.data;
    return getThemesResponse;
};

const ThemeService = {
    getAll,
};
  
export default ThemeService