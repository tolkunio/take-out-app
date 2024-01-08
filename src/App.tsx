import './App.css'
import {Button} from "src/components/Button";

function App() {
    return (
        <>
            <Button onClick={()=>{
                console.log('hello from btn')}}>Save</Button>
        </>
    )
}

export default App
