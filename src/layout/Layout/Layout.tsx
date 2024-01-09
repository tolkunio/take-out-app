import {Link, Outlet} from "react-router-dom";
import s from './Layout.module.css';
import menu from '../../assets/menu.svg';
import cart from '../../assets/cart.svg';
import avatar from '../../assets/avatar.svg';
import exit from '../../assets/exit.svg';
import {Button} from "../../components/Button/Button";

export const Layout = () => {
    return (
        <div className={s.layout}>
            <div className={s.sidebar}>
                <div className={s.user}>
                    <img src={avatar} className={s.avatar} alt={'иконка пользователя'}/>
                    <div className={s.name}> Tolkun </div>
                    <div className={s.email}> toprog27@gmail.com </div>
                </div>
                <div className={s.menu}>
                    <Link to={'/'} className={s.link}>
                        <img alt={'иконка меню'} src={menu}/>
                        Меню
                    </Link>
                    <Link to={'cart'} className={s.link}>
                        <img alt={'иконка корзины'} src={cart}/>
                        Корзина
                    </Link>
                </div>
                <Button className={s.exit}>
                    <img src={exit} alt={'иконка выхода'}/>
                    Выход
                </Button>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};