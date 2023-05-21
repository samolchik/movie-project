import {axiosService} from "./axios.service";
import {IGenre, IGenres} from "../interfaces";
import {IRes} from "../types";
import {urls} from "../constants";

class GenreService {
    getAll(): IRes<IGenres<IGenre[]>> {
        return axiosService.get(urls.genres.genres)
    }
}

const genreService = new GenreService();

export {
    genreService
};

