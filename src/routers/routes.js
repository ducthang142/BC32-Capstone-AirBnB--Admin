import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout/RootLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFound from "../components/NotFound";
import UserProtected from "./UserProtected";

const Home = lazy(() => import("../modules/Admin"));
const QuanLyNguoiDung = lazy(() => import("../modules/QuanLyNguoiDung"));
const QuanLyThongTinViTri = lazy(() =>
  import("../modules/QuanLyThongTinViTri")
);
const QuanLyThongTinPhong = lazy(() =>
  import("../modules/QuanLyThongTinPhong")
);
const QuanLyDatPhong = lazy(() => import("../modules/QuanLyDatPhong"));
const Signin = lazy(() => import("../modules/Signin"));

const routes = createBrowserRouter([
  // Signin
  { index: true, element: <Signin /> },

  //Admin
  {
    path: "/admin",
    element: (
      <UserProtected>
        <RootLayout />
      </UserProtected>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      //Home
      {
        path: "",
        element: <Home />,
        children: [
          //Quản lý người dùng
          { path: "/admin/quanlynguoidung", element: <QuanLyNguoiDung /> },

          //Quản lý thông tin vị trí
          {
            path: "/admin/quanlythongtinvitri",
            element: <QuanLyThongTinViTri />,
          },

          //Quản lý thông tin phòng
          {
            path: "/admin/quanlythongtinphong",
            element: <QuanLyThongTinPhong />,
          },

          //Quản lý đặt phòng
          { path: "/admin/quanlydatphong", element: <QuanLyDatPhong /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default routes;
