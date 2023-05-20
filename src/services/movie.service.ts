import {axiosService} from "./axios.service";
import {IRes} from "../types";
import {IMovie, IPagination} from "../interfaces";
import {urls} from "../constants";

class MovieService {
    getAll(page: number=1): IRes<IPagination<IMovie[]>> {
        return axiosService.get(urls.movies.movies, {
            params: {page}
        })
    }

    searchMoviesByGenreId(genre_ids: number, page: number): IRes<IPagination<IMovie[]>> {
        return axiosService.get(urls.movies.movies, {
            params: {with_genres: genre_ids, page}
        })
    }

    getPopular(page: number ): IRes<IPagination<IMovie[]>> {
        return axiosService.get(urls.movies.popular, {
            params: {page}
        })
    }

    getSearch(page: number, searchText: string): IRes<IPagination<IMovie[]>> {
        return axiosService.get(urls.search.search, {
                params: {page, query: searchText},
            }
        )
    }
}

const movieService = new MovieService();

export {
    movieService
};

