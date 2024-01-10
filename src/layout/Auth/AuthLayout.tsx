import {Outlet} from "react-router-dom";
import s from './AuthLayout.module.css';
import foodLogo from '../../assets/food-market-logo.svg';

export const AuthLayout = () => {
    return (
        <div className={s.authLayout}>
            <div className={s.logo}>
                <img className={s.img} src={foodLogo} alt={'logo'}/>
            </div>
            <div className={s.content}>
                <Outlet/>
            </div>
        </div>
    );
};