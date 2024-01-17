import {Heading} from "../../components/Heading/Heading";
import s from './Card.module.css';
import {useSelector} from "react-redux";
import {RootState,AppDispatch} from "../../store/store";
import {CartItem} from "../../components/CartItem/CartItem";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {Product} from "../../interfaces/product.interface";
import {useEffect} from "react";
import axios from "axios";
import {PREFIX} from "../../helpers/API";
import {Button} from "../../components/Button/Button";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart.slice";

export const Cart = () => {
    const DELIVERY_FEE=169;
    const [cartProducts, setCardProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s:RootState)=>s.user.jwt);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const total=items.map(item=>{
        const product=cartProducts.find(product=>product.id===item.id);
        if(!product){
            return 0;
        }
        return item.count*product.price;
    }).reduce((acc,i)=>acc+=i,0);

    const getItem = async (id: number) => {
        const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCardProducts(res);
    }
    const checkout =async ()=>{
        const {data}= await axios.post(`${PREFIX}/order`,{
            products:items
        },{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        dispatch(cartActions.clean());
        navigate('/success');
    }

    useEffect(() => {
        loadAllItems();
    }, [items])

    return (
        <>
            <Heading className={s.heading}>Корзина</Heading>
            {items.map(i => {
                const product = cartProducts.find(p => p.id === i.id);
                if (!product) {
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
            <div className={s.line}>
                <div className={s.text}>Итог</div>
                <div className={s.price}>{total}&nbsp;<span>₽</span></div>
            </div>
            <hr className={s.hr} />
            <div className={s.line}>
                <div className={s.text}>Доставка</div>
                <div className={s.price}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>
            </div>
            <hr className={s.hr} />
            <div className={s.line}>
                <div className={s.text}>Итог <span className={s.totalCount}>({items.length})</span></div>
                <div className={s.price}>{total + DELIVERY_FEE}&nbsp;<span>₽</span></div>
            </div>
            <div className={s.checkout}>
                <Button appearence="big" onClick={checkout}>оформить</Button>
            </div>
        </>

    );
};
