import {Heading} from "../../components/Heading/Heading";
import s from './Menu.module.css';
import {Search} from "../../components/Search/Search";
import {ProductCard} from "../../components/ProductCard/ProductCard";
import {PREFIX} from "../../helpers/API";
import {Product} from "../../interfaces/product.interface";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {AxiosError} from "axios";
import MenuList from "./MenuList/MenuList";


export const Menu = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

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
            if (e instanceof AxiosError) {
                setError(e.message);
            }
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
                <div className={s.error}>
                    {error && {error}}
                </div>
                {!isLoading && <MenuList products={products}/>}
                {isLoading && <span>Загружается продукты...</span>}
            </div>

        </>
    );
};
