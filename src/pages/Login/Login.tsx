import s from './Login.module.css';
import {Heading} from "../../components/Heading/Heading";
import {Button} from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";
import {Link} from "react-router-dom";
import {FormEvent} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {login} from "../../store/user.slice";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
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
    const {jwt,loginErrorMsg} = useSelector((s: RootState) => s.user);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        dispatch(userActions.clearLoginError());
        e.preventDefault();
        const target = e.target as typeof e.target & LoginType;
        const {email, password} = target;

        await sendLogin(email.value, password.value);
    };

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({email, password}));
    }
    return (
        <div className={s.login}>
            <form className={s.formBlock} onSubmit={submit}>
                <Heading className={s.heading}>Вход</Heading>
                {loginErrorMsg && <div className={s.error}>{loginErrorMsg}</div>}
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