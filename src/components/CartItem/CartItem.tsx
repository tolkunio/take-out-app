import s from './CartItem.module.css';
import {CartItemProps} from "./CartItem.props";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import deleteBtn from "../../assets/delete-icon.svg"
import increaseBtn from "../../assets/plus-icon.svg"
import decreaseBtn from "../../assets/minus-icon.svg"
import {cartActions} from "../../store/cart.slice";

export const CartItem = (props: CartItemProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const increase=()=>{

        dispatch(cartActions.add(props.id));
    }

    const decrease=()=>{
        dispatch(cartActions.decrease(props.id));
    }

    const deleteItem=()=>{
        dispatch(cartActions.delete(props.id));
    }

    return (
        <div className={s.cartItem}>
                <div className={s.img} style={{backgroundImage:`url(${props.img}`}}></div>
                <div className={s.desc}>
                    <div className={s.name}>{props.name}</div>
                    <div className={s.price}>
                        {props.price}
                        <span className={s.currency}>Р</span>
                    </div>
                </div>
                <div className={s.actions}>
                    <button className={s.decrease} onClick={decrease}>
                        <img src={decreaseBtn} alt={'cartBtnAdd'}/>
                    </button>
                    <div className={s.number}>{props.count}</div>
                    <button className={s.increase} onClick={increase}>
                        <img src={increaseBtn} alt={'cartBtnAdd'}/>
                    </button>

                    <button className={s.button} onClick={deleteItem}>
                        <img src={deleteBtn} alt={'cartDeleteBtn'}/>
                    </button>
                </div>
        </div>
    );
};
