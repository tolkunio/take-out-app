import {Heading} from "../../components/Heading/Heading";
import s from './Menu.module.css';
import {Search} from "../../components/Search/Search";
import {PREFIX} from "../../helpers/API";
import {Product} from "../../interfaces/product.interface";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {AxiosError} from "axios";
import MenuList from "./MenuList/MenuList";
import {ChangeEvent} from "react";


export const Menu = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getMenu(filter)
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {
            setisLoading(true);
            const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {name}
            });
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

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    return (
        <>
            <div className={s.head}>
                <Heading> Меню</Heading>
                <Search placeholder={'Введите блюдо или состав'} onChange={updateFilter}/>
            </div>
            <div>
                <div className={s.error}>
                    {error && {error}}
                </div>
                {!isLoading && products.length>0 && <MenuList products={products}/>}
                {isLoading && <span>Загружается продукты...</span>}
                {!isLoading && products.length===0 && <>Не найдено блюдо по запросу</>}
            </div>

        </>
    );
};
