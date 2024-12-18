import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom";

import Home from "../views/Home/Home";
import SingIn from "../views/SingIn/SingIn";
import SingUp from "../views/SingUp/SingUp";
import DashBoard from "../views/DashBoard";
import Form from "../views/Form/Form";
import Settings from "../views/Settings/Settings";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Navigate to="/singin" />} />
            <Route path="/singup" element={<SingUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/singin" element={<SingIn />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/form" element={<Form />} />
            <Route path="/settings" element={<Settings />} />
        </>
    )
);

const Index = () => {
    return <RouterProvider router={router} />;
};

export default Index;
