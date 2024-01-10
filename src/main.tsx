import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {Menu} from "./pages/Menu/Menu";
import {Cart} from "./pages/Cart/Cart";
import {Error} from "./pages/Error/Error";
import {createBrowserRouter} from "react-router-dom";
import {Layout} from "./layout/Layout/Layout";
import {Product} from "./pages/Product/Product";
import axios from "axios";
import {PREFIX} from "./helpers/API";
const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Menu/>,
            },
            {
                path:'/cart',
                element:<Cart/>
            },
            {
                path: '/product/:id',
                element:<Product/>,
                loader: async ({params})=>{
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 2000);
                    });
                    const {data}= await axios.get(`${PREFIX}/products/${params.id}`);
                    return data;
                }
            }
        ]
    },
    {
        path:'*',
        element:<Error/>
    }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
