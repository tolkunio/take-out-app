import s from './Product.module.css';
import {useParams} from 'react-router-dom';

export const Product = () => {
    const { id } = useParams();
    return (
        <div className={s.product}>
            Product-{ id }
        </div>
    );
};
