import s from './Login.module.css';
import {Heading} from "../../components/Heading/Heading";
import {Button} from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";
import {Link} from "react-router-dom";
import {FormEvent} from "react";

const Login = () => {
    const submit =(e:FormEvent)=>{
        e.preventDefault();
        console.log(e);
    }
    return (
        <div className={s.login} >
            <form className={s.formBlock} onSubmit={submit}>
                <Heading className={s.heading}>Вход</Heading>
                <div className={s.field}>
                    <label htmlFor={'email'} className={s.email}>Ваш еmail</label>
                    <Input id='email' placeholder={'Email'}/>
                </div>
                <div className={s.field}>
                    <label htmlFor={'password'} className={s.password}>Ваш пароль</label>
                    <Input id='password' type={'password'} placeholder={'Пароль'}/>
                </div>
            </form>
            <div className={s.links}>
                <Button appearence={'big'} className={s.button}>Вход</Button>
                <div className={s.footer}>
                    <div>Нет аккаунта?</div>
                    <Link to={'/auth/register'}>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;