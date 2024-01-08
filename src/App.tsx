import { Routes, Route } from 'react-router-dom';
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";
import {Menu} from "./pages/Menu/Menu";
import {Cart} from "./pages/Cart/Cart";
import {Error} from "./pages/Error/Error";

function App() {
    return (
        <>
            <Button onClick={()=>{
                console.log('hello from btn')}}>small</Button>
            <Button appearence={'big'}>Big</Button>
            <Input placeholder={'email'}/>
            <div>
                <a href={'/'}>Menu</a>
                <a href={'cart'}>Cart</a>
            </div>
            <Routes>
                <Route path={'/'} element={<Menu/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'*'} element={<Error/>}/>
            </Routes>
        </>
    )
}

export default App
