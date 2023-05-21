
import Box from "@mui/material/Box";

import {useAppDispatch, useAppSelector} from '../../hooks';
import './pagination.css';
import {FC} from "react";
import {movieActions} from "../../redux";

interface IProps {
    page: number
}

const MoviePagination:FC<IProps> = ({page}) => {
    const {  totalPages } = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();

    const maxPageLinks = 5;

    const prev = () => {
       dispatch(movieActions.setPage(--page))
    };

    const next = () => {
        dispatch(movieActions.setPage(++page));
    };

    const handlePageClick = (pageNum) => {
        dispatch(movieActions.setPage(pageNum))
    };

    const getPageLinks = () => {
        const pageLinks = [];
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > maxPageLinks) {
            const midPage = Math.floor(maxPageLinks / 2);
            if (page > midPage) {
                startPage = page - midPage;
                endPage = startPage + maxPageLinks - 1;
                if (endPage > totalPages) {
                    endPage = totalPages;
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
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <ul className={"pagination"}>
                <button disabled={page === 1} onClick={prev} className={"waves-effect"}>
                    PREV
                </button>
                {totalPages > maxPageLinks && page > Math.ceil(maxPageLinks / 2) && (
                    <li className={"disabled, number"}>
                        ...
                    </li>
                )}
                {getPageLinks()}
                {totalPages > maxPageLinks && page < totalPages - Math.floor(maxPageLinks / 2) && (
                    <li className={"disabled, number"}>
                        ...
                    </li>
                )}
                <button disabled={page === totalPages} onClick={next} className={"waves-effect"}>
                    NEXT
                </button>
            </ul>
        </Box>
    );
};

export { MoviePagination };
