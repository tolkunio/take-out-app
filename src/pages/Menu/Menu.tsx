import {Heading} from "../../components/Heading/Heading";
import s from './Menu.module.css';
import {Search} from "../../components/Search/Search";
import {ProductCard} from "../../components/ProductCard/ProductCard";
import {PREFIX} from "../../helpers/API";
import {Product} from "../../interfaces/product.interface";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";


export const Menu = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading,setisLoading]=useState<boolean>(false);
    
    const getMenu = async () => {
        try {
            setisLoading(true);
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 2000);
            });
            const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
            setProducts(data);
            setisLoading(false)
        } catch (e) {
            console.error(e);
            setisLoading(false)
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
                {!isLoading && products.map(item =>
                    <ProductCard key={item.id}
                                 id={item.id}
                                 title={item.name}
                                 description={item.ingredients.join(', ')}
                                 img={item.image}
                                 price={item.price}
                                 rating={item.rating}/>)}
                {isLoading &&<span>Загружается продукты...</span>}
            </div>

        </>
    );
};
