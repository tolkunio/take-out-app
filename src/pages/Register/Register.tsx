import s from './Register.module.css';
import {Heading} from "../../components/Heading/Heading";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
const Register = () => {
    const submit=()=>{

    }
    const loginErrorMsg:string=''

    return (
        <div className={s.register}>
            <form className={s.formBlock} onSubmit={submit}>
                <Heading className={s.heading}>Регистрация</Heading>
                {loginErrorMsg && <div className={s.error}>{loginErrorMsg}</div>}
                <div className={s.field}>
                    <label htmlFor={'email'} className={s.email}>Ваш еmail</label>
                    <Input id='email' name={'email'} placeholder={'Email'}/>
                </div>
                <div className={s.field}>
                    <label htmlFor={'password'} className={s.password}>Ваш пароль</label>
                    <Input id='password' name={'password'} type={'password'} placeholder={'Пароль'}/>
                </div>
                <div className={s.field}>
                    <label htmlFor={'name'} className={s.name}>Ваше имя</label>
                    <Input id='name' name={'name'} placeholder={'Имя'}/>
                </div>
                <Button appearence={'big'} className={s.button}>Вход</Button>
            </form>
        </div>
    );
};

export default Register;