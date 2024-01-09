import styles from './Search.module.css';
import cn from 'classnames';
import {SearchProps} from "./Search.props";
import {forwardRef} from "react";
import search from '../../assets/search.svg';

export const Search = forwardRef<HTMLInputElement,SearchProps>(({isValid = true, ...props}) => {
    return (
        <div className={styles.searchWrapper}>
            <input className={cn(styles.search,
                isValid ? '' : styles.invalid
            )}{...props}/>
            <img  className={styles.searchIcon} src={search} alt={'search'}/>
        </div>

    );
});