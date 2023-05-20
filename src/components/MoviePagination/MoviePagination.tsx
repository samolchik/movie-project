import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import './pagination.css';
import {ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const MoviePagination = () => {
    const { page, numOfPages } = useAppSelector(state => state.movieReducer);
    const [, setQuery] = useSearchParams();

    const maxPageLinks = 5;

    const prev = () => {
        setQuery(prevParams => ({ ...prevParams, page: +prevParams.get('page') - 1 }));
    };

    const next = () => {
        setQuery(prevParams => ({ ...prevParams, page: +prevParams.get('page') + 1 }));
    };

    const handlePageClick = (pageNum) => {
        setQuery({ page: String(pageNum) });
    };

    const getPageLinks = () => {
        const pageLinks = [];
        let startPage = 1;
        let endPage = numOfPages;

        if (numOfPages > maxPageLinks) {
            const midPage = Math.floor(maxPageLinks / 2);
            if (page > midPage) {
                startPage = page - midPage;
                endPage = startPage + maxPageLinks - 1;
                if (endPage > numOfPages) {
                    endPage = numOfPages;
                    startPage = endPage - maxPageLinks + 1;
                }
            } else {
                endPage = maxPageLinks;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const active = page === i ? 'active' : '';

            pageLinks.push(
                <li className={`waves-effect ${active}`} key={i}>
                    <button  className={'colorActive'} onClick={() => handlePageClick(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        return pageLinks;
    };

    return (
        <Box>
            <ul className={"pagination"}>
                <button disabled={page === 1} onClick={prev} className={"waves-effect"}>
                    PREV
                </button>
                {numOfPages > maxPageLinks && page > Math.ceil(maxPageLinks / 2) && (
                    <li className={"disabled"}>
                        <span className={"number"}>...</span>
                    </li>
                )}
                {getPageLinks()}
                {numOfPages > maxPageLinks && page < numOfPages - Math.floor(maxPageLinks / 2) && (
                    <li className={"disabled"}>
                        <span className={"number"}>...</span>
                    </li>
                )}
                <button disabled={page === numOfPages} onClick={next} className={"waves-effect"}>
                    NEXT
                </button>
            </ul>
        </Box>
    );
};

export { MoviePagination };
