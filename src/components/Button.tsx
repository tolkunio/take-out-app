import s from './Button.module.css'
import cn from 'classnames'
import {ButtonProps} from "src/components/Button.props";
import {FC} from "react";
export const Button:FC<ButtonProps> = ({className,children, ...props}) => {
    return (
        <button className={cn(s.button,className)} {...props}>
            {children}
        </button>
    );
};