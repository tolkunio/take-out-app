import s from './Success.module.css';
import {useNavigate} from 'react-router-dom';
import {Button} from "../../components/Button/Button";
import pizza from '../../assets/pizza.png';

const Success = () => {
    const navigate = useNavigate();
    return (
        <div className={s.success}>
            <img src={pizza} alt="Изображение пиццы" />
            <div className={s.text}>Ваш заказ успешно оформлен!</div>
            <Button appearence="big" onClick={() => navigate('/')}>Сделать новый</Button>
        </div>
    );
};

export default Success;