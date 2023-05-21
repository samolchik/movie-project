const baseURL = 'https://api.themoviedb.org/3';
const baseImageURL = 'https://image.tmdb.org/t/p/w500/';
const baseVideoURL = 'https://www.youtube.com/embed/';

const notImg = `https://as1.ftcdn.net/v2/jpg/05/04/28/96/1000_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg`;
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDY4ZmVmMjlkNDQxM2VkOTc4NjQ4N2EzYTQxODk1ZSIsInN1YiI6IjY0NWZhN2YzZWY4YjMyMDE1NTU0NmJkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ub7lcnsBNgtdDKJN8XMAnp7HiyVzfZMBy6dXBehd-wY'

const movie = '/movie';

const urls = {
    movies: {
        movies:`/discover${movie}`,
        popular:`${movie}/popular`,
        video:(id: number):string=> `${movie}/${id}/videos`
    },
    genres: {
        genres:`/genre${movie}/list`
    },
    search: {
        search:`/search${movie}`
    }
};


export {
    baseURL,
    baseImageURL,
    baseVideoURL,
    urls,
    API_KEY,
    notImg
};