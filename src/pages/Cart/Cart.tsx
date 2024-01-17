import {Heading} from "../../components/Heading/Heading";
import s from './Card.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {CartItem} from "../../components/CartItem/CartItem";
import {useState} from "react";
import {Product} from "../../interfaces/product.interface";
import {useEffect} from "react";
import axios from "axios";
import {PREFIX} from "../../helpers/API";

export const Cart = () => {
    const [cartProducts, setCardProducts] = useState<Product[]>([]);

    const items = useSelector((s: RootState) => s.cart.items);

    const getItem = async (id: number) => {
        const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCardProducts(res);
    }

    useEffect(() => {
        loadAllItems();
    }, [items])

    return (
        <>
            <Heading className={s.heading}>Корзина</Heading>
            {items.map(i=>{
                const product=cartProducts.find(p=>p.id===i.id);
                if(!product){
                    return;
                }
                return <CartItem key={product.id}
                                 count={i.count}
                                 id={product.id}
                                 name={product.name}
                                 img={product.image}
                                 price={product.price}
                />
            })}
        </>

    );
};
