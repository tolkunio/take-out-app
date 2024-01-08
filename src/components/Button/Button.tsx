import cn from 'classnames'
import {FC} from "react";
import {ButtonProps} from "./Button.props";
import styles from './Button.module.css'

export const Button: FC<ButtonProps> = ({children, appearence='small', ...props}: ButtonProps) => {
    return (
        <button className={cn(styles['button'],appearence==='small'?styles['small']:'',appearence==='big'?styles['big']:'')} {...props}>
            {children}
        </button>
    );
};