import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import ShopLayout from "./ShopLayout"
import ProductList from "./Products/ProductList"


export const ShopRouter = () => {
    createBrowserRouter(
        createRoutesFromElements(
            <Route path="" element = {<ShopLayout />}>
                <Route index element = {<ProductList />} />
            </Route>
        )
    )
}