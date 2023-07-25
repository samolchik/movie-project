import {axiosService} from "./axios.service";
import {IRes} from "../types";
import {IMovie, IPagination, IVideos} from "../interfaces";
import {urls} from "../constants";

class MovieService {
    getAll(page: number): IRes<IPagination<IMovie[]>> {
        return axiosService.get(urls.movies.movies, {
            params: {page}
        })
    }

    searchMoviesByGenreId(genreIds: number, page: number): IRes<IPagination<IMovie[]>> {
        return axiosService.get(urls.movies.movies, {
            params: {with_genres: genreIds, page}
        })
    }

    getPopular(page: number): IRes<IPagination<IMovie[]>> {
        return axiosService.get(urls.movies.popular, {
            params: {page}
        })
    }

    getSearch(searchText: string, page: number,): IRes<IPagination<IMovie[]>> {
        return axiosService.get(urls.search.search, {
                params: {page, query: searchText},
            }
        )
    }

    getSelectByYear(page: number, year: number): IRes<IPagination<IMovie[]>> {
        return axiosService.get(urls.movies.movies, {
                params: {page, primary_release_year: year},
            }
        )
    }

    getVideo(id: number): IRes<IVideos> {
        return axiosService.get(urls.movies.video(id))
    }
}

const movieService = new MovieService();

export {
    movieService
};

