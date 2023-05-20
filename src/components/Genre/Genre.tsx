import React, { FC } from 'react';
import { IGenre } from '../../interfaces';
import css from '../Genres/Genres.module.css';

interface IProps {
    genre: IGenre;
    selected: boolean;
    onSelect: (genre: IGenre) => void;
}

const Genre: FC<IProps> = ({ genre, selected, onSelect }) => {
    const { id, name } = genre;

    const handleSelect = () => {
        onSelect(genre);
    };

    return (
        <div className={css.WrapGenre}>
            <div className={selected ? `${css.Genre} ${css.Selected}` : css.Genre} onClick={handleSelect}>
                {name}
            </div>
        </div>
    );
};

export { Genre };
