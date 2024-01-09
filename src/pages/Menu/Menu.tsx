import {Heading} from "../../components/Heading/Heading";
import s from './Menu.module.css';
import {Search} from "../../components/Search/Search";
import {ProductCard} from "../../components/ProductCard/ProductCard";
import product1 from '../../assets/product-demo.png';

export const Menu = () => {
    return (
        <>
            <div className={s.head}>
                <Heading className={s.menu}> Меню</Heading>
                <Search placeholder={'Введите блюдо или состав'}/>
            </div>
            <div className={s.cardList}>
                <ProductCard id={1}
                             title={'Наслаждение'}
                             description={'Салями,руккола,помидоры,оливки'}
                             img={product1}
                             price={300}
                             rating={4.5}/>
            </div>

        </>
    );
};
