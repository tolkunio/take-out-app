import {Outlet} from "react-router-dom";
import s from './Layout.module.css';
import menu from '../../assets/menu.svg';
import cart from '../../assets/cart.svg';
import avatar from '../../assets/avatar.svg';
import exit from '../../assets/exit.svg';
import {Button} from "../../components/Button/Button";
import {NavLink, useNavigate} from "react-router-dom";
import cn from "classnames";

export const Layout = () => {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('jwt');
        navigate('/auth/login');

    }
    return (
        <div className={s.layout}>
            <div className={s.sidebar}>
                <div className={s.user}>
                    <img src={avatar} className={s.avatar} alt={'иконка пользователя'}/>
                    <div className={s.name}> Tolkun</div>
                    <div className={s.email}> toprog27@gmail.com</div>
                </div>
                <div className={s.menu}>
                    <NavLink to={'/'} className={({isActive}) => cn(s.link, isActive ? s.active : '')}>
                        <img alt={'иконка меню'} src={menu}/>
                        Меню
                    </NavLink>
                    <NavLink to={'cart'} className={({isActive}) => cn(s.link, isActive ? s.active : '')}>
                        <img alt={'иконка корзины'} src={cart}/>
                        Корзина
                    </NavLink>
                </div>
                <Button className={s.exit} onClick={logOut}>
                    <img src={exit} alt={'иконка выхода'}/>
                    Выход
                </Button>
            </div>
            <div className={s.content}>
                <Outlet/>
            </div>
        </div>
    );
};