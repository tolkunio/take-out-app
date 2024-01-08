import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";

function App() {
    return (
        <>
            <Button onClick={()=>{
                console.log('hello from btn')}}>small</Button>
            <Button appearence={'big'}>Big</Button>
            <Input placeholder={'email'}/>
        </>
    )
}

export default App
