import s from './ProductCard.module.css';
import {ProductCardProps} from "./ProductCard.props";
import cartBtn from '../../assets/cart-button.svg';
import star from '../../assets/star-icon.svg';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {cartActions} from "../../store/cart.slice";

export const ProductCard = ({id,title, rating, price, description, img}: ProductCardProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const addToCard=(e:MouseEvent)=>{
        e.preventDefault();
        dispatch(cartActions.add(id));
    }
    return (
        <Link to={`/product/${id}`} className={s.link}>
            <div className={s.card}>
                <div className={s.head} style={{backgroundImage: `url('${img}')`}}>
                    <div className={s.price}>
                        {price}
                        <span className={s.currency}>Р</span>
                    </div>
                    <button className={s.addToCard} onClick={addToCard}>
                        <img src={cartBtn} alt={'cartBtnAdd'}/>
                    </button>
                    <div className={s.rating}>
                        {rating}
                        <img src={star} alt={'star icon'}/>
                    </div>
                </div>
                <div className={s.footer}>
                    <div className={s.title}>{title}</div>
                    <div className={s.desc}>{description}</div>
                </div>
            </div>
        </Link>

    );
};