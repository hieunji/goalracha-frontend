import { Suspense, lazy } from "react";
import React from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";

import MemberRouter from "./userRouter.js";
import ownerRouter from "./ownerRouter.js";
import BoardRouter from "./boardRouter.js";
import ReservRouter from "./reservRouter.js";
import adminRouter from "./adminRouter"; // adminRouter를 불러옵니다.


import AdminLogin from "../components/member/admin/AdminLoginComponent"; //admin 로그인 페이지

const Main = lazy(() => import("../pages/MainPage"));
const Test = lazy(() => import("../pages/test"));
const Login = lazy(() => import("../pages/member/user/LoginPage.js"));
const Logout = lazy(() => import("../pages/member/Logout.js"));
const GroundInfoPage = lazy(() => import("pages/reserve/user/GroundInfoPage.js"))
const LoadingPage = lazy(() => import("pages/loading"))

const BoardList = lazy(() => import("pages/board/UserListPage.js"));


const root = createBrowserRouter([
    {
        path: "test",
        element: <Test/>,
    },
    {
        path: "/",
        element: (
            <Navigate replace to="/reserve" />
        ),
    },
    {
        path: "loading",
        element:  <LoadingPage />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "logout",
        element: <Logout />
    },
    {
        path: "reserve",
        children: ReservRouter()
    },
    {
        path: "ground/:gno",
        element: <GroundInfoPage />
    },
    {
        path: "user",
        children: MemberRouter(),
    },
    {
        path: "owner",
        children: ownerRouter(),
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        path: "notice",
        element: <BoardList />
    },
    ...adminRouter(), // adminRouter 함수를 호출하여 라우트 배열을 펼침
]);

export default root;
