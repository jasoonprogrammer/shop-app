import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../pages/Authentication/Login/Login";
import SignUp from "../pages/Authentication/Signup/Signup";

export const AuthRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="">
            <Route index element = {<Login />} />
            <Route path="register" element = {<SignUp />} />
        </Route>
    )
)
