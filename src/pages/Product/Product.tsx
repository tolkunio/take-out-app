import s from './Product.module.css';
import {useLoaderData} from 'react-router-dom';
import {Product} from "../../interfaces/product.interface";

export const Product = () => {
    const data = useLoaderData() as Product;
    return (
        <div className={s.product}>
            Product-{ data.name }
        </div>
    );
};
