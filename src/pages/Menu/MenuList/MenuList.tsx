import s from './MenuList.module.css';
import {ProductCard} from "../../../components/ProductCard/ProductCard";
import {MenuListProps} from "./MenuList.props";
const MenuList = ({products}:MenuListProps) => {
    return<div className={s.menuList}>
        {products.map(item =>
            <ProductCard key={item.id}
                         id={item.id}
                         title={item.name}
                         description={item.ingredients.join(', ')}
                         img={item.image}
                         price={item.price}
                         rating={item.rating}/>)}}
    </div>
};

export default MenuList;