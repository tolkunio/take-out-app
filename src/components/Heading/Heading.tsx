import styles from './Heading.module.css';
import cn from 'classnames';
import {HeadingProps} from "./Heading.props";

export const Heading = ({children,className,...props}:HeadingProps) => {
    return (
        <h1 className={cn(styles.h1,className)}{...props}>
            {children}
        </h1>
    );
};