import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import HomePage from "./components/HomePage";
import Explor from "./components/Explor";
import OrderDetail from "./components/OrderDetail";
import RecommendedList from "./components/RecommendedList";
import TripBoards from "./components/TripBoards";
import Error404Page from "./components/Error404Page";
import SignIn from "./components/SignIn";
import ChooseDate from "./components/ChooseDate";
import RegisterPage from "./components/RegisterPage";
import TripBoardDetail from "./components/TripBoardDetail";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        errorElement: <Error404Page />,
        children:[
            {
                index: true,
                element: <HomePage />,
            },
            {
                path:"TripBoards",
                element: <TripBoards />,
            },
            {
                path:"Explor",
                element: <Explor />,
            },
            {
                path:"RecommendedList",
                element: <RecommendedList />,
            },
            {
                path: "OrderDetail",
                element: <OrderDetail />,
            },
            {
                path: "SignIn",
                element: <SignIn />,
            },
            {
                path: "ChooseDate",
                element: <ChooseDate />,
            },
            {
                path: "SignUp",
                element: <RegisterPage />,
            },
            {
                path: "TripBoardDeatil",
                element: <TripBoardDetail />,
            },
        ],
    },
]);

export default router;