import {InputHTMLAttributes} from "react";
import {ReactNode} from "react";

export interface HeadingProps extends InputHTMLAttributes<HTMLHeadingElement>{
    children:ReactNode,
    className:string
}