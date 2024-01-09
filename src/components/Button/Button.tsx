import cn from 'classnames'
import {ButtonProps} from "./Button.props";
import styles from './Button.module.css'

export const Button = ({children,className, appearence='small', ...props}: ButtonProps) => {
    return (
        <button className={
            cn(styles['button'], className, appearence==='small'?styles['small']:'',appearence==='big'?styles['big']:'')} {...props}>
            {children}
        </button>
    );
};