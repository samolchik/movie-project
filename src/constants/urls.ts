// const baseURL = 'https://api.themoviedb.org/3';
const baseImageURL = 'https://image.tmdb.org/t/p/w500/';
const baseVideoURL = 'https://www.youtube.com/embed/';

const notImg = 'https://bazarama.com/assets/imgs/Image-not-available.png';

const urls = {
    movies: {
        movies:`/discover/movie`,
        popular:`/movie/popular`,
        video:(id: number):string=> `/movie/${id}/videos`
    },
    genres: {
        genres:`/genre/movie/list`
    },
    search: {
        search:`/search/movie`
    }
};


export {
    baseImageURL,
    baseVideoURL,
    urls,
    notImg
};