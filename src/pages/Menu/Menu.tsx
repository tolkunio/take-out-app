import {Heading} from "../../components/Heading/Heading";
import s from './Menu.module.css';
import {Search} from "../../components/Search/Search";

export const Menu = () => {
    return (
        <>
            <div className={s.head}>
                <Heading className={s.menu}> Меню</Heading>
                <Search placeholder={'Введите блюдо или состав'}/>
            </div>

        </>
    );
};
