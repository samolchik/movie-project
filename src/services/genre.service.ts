import {axiosService} from "./axios.service";
import {IRes} from "../types";
import {IGenre} from "../interfaces";
import {urls} from "../constants";
import {IGenres} from "../interfaces/genres.inerface";

class GenreService {
    getAll(): IRes<IGenres<IGenre[]>> {
        return axiosService.get(urls.genres.genres)
    }
}

const genreService = new GenreService();

export {
    genreService
};

