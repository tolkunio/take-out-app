import styles from './Input.module.css';
import cn from 'classnames';
import {InputProps} from "./Input.props";
import {forwardRef} from "react";

export const Input = forwardRef<HTMLInputElement,InputProps>(({isValid = true, ...props}) => {
    return (
        <input className={cn(styles.input,
            isValid ? '' : styles.invalid
        )}
               {...props}/>
    );
});