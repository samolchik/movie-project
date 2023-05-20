const useGenre = (selectedGenres: { id: number }[]): string => {
    if (selectedGenres.length < 1) return '';

    const genreIds: number[] = selectedGenres.map((g) => g.id);
    return genreIds.reduce((acc, curr) => acc + ',' + curr.toString(), '');
};

export {
    useGenre
};