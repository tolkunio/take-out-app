import s from './Register.module.css';
import {Heading} from "../../components/Heading/Heading";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {AppDispatch} from "../../store/store";
import {FormEvent} from "react";
import {register} from "../../store/user.slice";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {userActions} from "../../store/user.slice";

type RegisterType = {
    email: {
        value: string
    },
    name: {
        value: string
    }
    password: {
        value: string
    }
}
const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {jwt, registerErrorMsg} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        console.log(jwt);
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        dispatch(userActions.clearRegisterError());
        e.preventDefault();
        const target = e.target as typeof e.target & RegisterType;
        const {email, name, password} = target;
        dispatch(register({email: email.value, name: name.value, password: password.value}));
    }
    return (
        <div className={s.register}>
            <form className={s.formBlock} onSubmit={submit}>
                <Heading className={s.heading}>Регистрация</Heading>
                {registerErrorMsg && <div className={s.error}>{registerErrorMsg}</div>}
                <div className={s.field}>
                    <label htmlFor={'email'} className={s.email}>Ваш еmail</label>
                    <Input id='email' name={'email'} placeholder={'Email'}/>
                </div>
                <div className={s.field}>
                    <label htmlFor={'name'} className={s.name}>Ваше имя</label>
                    <Input id='name' name={'name'} placeholder={'Имя'}/>
                </div>
                <div className={s.field}>
                    <label htmlFor={'password'} className={s.password}>Ваш пароль</label>
                    <Input id='password' name={'password'} type={'password'} placeholder={'Пароль'}/>
                </div>
                <Button appearence={'big'} className={s.button}>Регистрация</Button>
            </form>
            <div className={s.links}>
                <div>Есть аккаунт?</div>
                <Link to={'/auth/login'}>Войти</Link>
            </div>
        </div>
    );
};

export default Register;