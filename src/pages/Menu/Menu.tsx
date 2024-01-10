import {Heading} from "../../components/Heading/Heading";
import s from './Menu.module.css';
import {Search} from "../../components/Search/Search";
import {ProductCard} from "../../components/ProductCard/ProductCard";
import {PREFIX} from "../../helpers/API";
import {Product} from "../../interfaces/product.interface";
import {useState} from "react";
import {useEffect} from "react";


export const Menu = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const getMenu = async () => {
        try {
            const res = await fetch(`${PREFIX}/products`);
            if (!res.ok) {
                console.log(res.status);
                return;
            }
            const data = await res.json() as Product[];
            setProducts(data);
        } catch (e) {
            console.error(e);
            return;
        }
    };

    useEffect(() => {
        getMenu()
    }, []);

    return (
        <>
            <div className={s.head}>
                <Heading className={s.menu}> Меню</Heading>
                <Search placeholder={'Введите блюдо или состав'}/>
            </div>
            <div className={s.cardList}>
                {products.map(item =>
                    <ProductCard key={item.id}
                                 id={item.id}
                                 title={item.name}
                                 description={item.ingredients.join(', ')}
                                 img={item.image}
                                 price={item.price}
                                 rating={item.rating}/>)}
            </div>

        </>
    );
};
