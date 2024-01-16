import s from './CartItem.module.css';
import {CartItemProps} from "./CartItem.props";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import cartBtn from "../../assets/cart-button.svg";
import deleteBtn from "../../assets/delete-icon.svg"
import increaseBtn from "../../assets/plus-icon.svg"
import descreaseBtn from "../../assets/minus-icon.svg"
import {cartActions} from "../../store/cart.slice";

export const CartItem = ({id,count,price,name,img}: CartItemProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const increase=()=>{

        dispatch(cartActions.add(id));
    }

    const descrease=()=>{

    }

    const remove=()=>{

    }

    return (
        <div className={s.cartItem}>
            <div className={s.head}>
                <div className={s.img} style={{backgroundImage:`url(${img}`}}></div>
                <div className={s.desc}>
                    <div className={s.name}>{name}</div>
                    <div className={s.price}>
                        {price}
                        <span className={s.currency}>Р</span>
                    </div>
                </div>
                <div className={s.actions}>
                    <button className={s.button} onClick={descrease}>
                        <img src={deleteBtn} alt={'cartDeleteBtn'}/>
                    </button>
                    <div>{count}</div>
                    <button className={s.button} onClick={increase}>
                        <img src={increaseBtn} alt={'cartBtnAdd'}/>
                    </button>
                    <button className={s.remove} onClick={remove}>
                        <img src={descreaseBtn} alt={'cartBtnAdd'}/>
                    </button>
                </div>

            </div>
        </div>
    );
};
