import s from './Login.module.css';
import {Heading} from "../../components/Heading/Heading";
import {Button} from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";
import {Link} from "react-router-dom";
import {FormEvent} from "react";
import axios from "axios";
import {PREFIX} from "../../helpers/API";
import {AxiosError} from "axios";
import {useState} from "react";
import {LoginResponse} from "../../interfaces/auth.interface";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {userActions} from "../../store/user.slice";

type LoginType = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}
const Login = () => {
    const [error,setError]=useState<string|undefined>('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const submit = async (e: FormEvent) => {
        setError(null);
        e.preventDefault();
        const target = e.target as typeof e.target & LoginType;
        const {email, password} = target;

        await sendLogin(email.value, password.value);
    }
    const sendLogin = async (email: string, password: string) => {
        try {
            const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
                email, password
            });
            localStorage.setItem('jwt',data.access_token);
            dispatch(userActions.addJwt(data.access_token));
            navigate('/')
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e.response.data.message);
            }
        }
    }
    return (
        <div className={s.login}>
            <form className={s.formBlock} onSubmit={submit}>
                <Heading className={s.heading}>Вход</Heading>
                {error && <div className={s.error}>{error}</div>}
                <div className={s.field}>
                    <label htmlFor={'email'} className={s.email}>Ваш еmail</label>
                    <Input id='email' name={'email'} placeholder={'Email'}/>
                </div>
                <div className={s.field}>
                    <label htmlFor={'password'} className={s.password}>Ваш пароль</label>
                    <Input id='password' name={'password'} type={'password'} placeholder={'Пароль'}/>
                </div>
                <Button appearence={'big'} className={s.button}>Вход</Button>
            </form>
            <div className={s.links}>
                <div>Нет аккаунта?</div>
                <Link to={'/auth/register'}>Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default Login;