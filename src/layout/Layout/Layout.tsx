import {Outlet} from "react-router-dom";
import s from './Layout.module.css';
import menu from '../../assets/menu.svg';
import cart from '../../assets/cart.svg';
import avatar from '../../assets/avatar.svg';
import exit from '../../assets/exit.svg';
import {Button} from "../../components/Button/Button";
import {NavLink, useNavigate} from "react-router-dom";
import cn from "classnames";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {userActions} from "../../store/user.slice";
import {useEffect} from "react";
import {getProfile} from "../../store/user.slice";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((state:RootState)=>state.user.profile);

    useEffect(()=>{
        dispatch(getProfile())
    },[dispatch])
    const logOut = () => {
        dispatch(userActions.logOut());
         navigate('/auth/login');

    }
    return (
        <div className={s.layout}>
            <div className={s.sidebar}>
                <div className={s.user}>
                    <img src={avatar} className={s.avatar} alt={'иконка пользователя'}/>
                    <div className={s.name}> {profile?.name}</div>
                    <div className={s.email}>{profile?.email}</div>
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