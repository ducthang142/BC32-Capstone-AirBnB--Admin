import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// Kiểm tra xem user có quyền truy cập vào /checkoute/:checkoutId hay không
const UserProtected = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // useLocation trả về một object chứa thông tin URL hiện tại của browser
  const location = useLocation();

  // Chưa đăng nhập
  if (!user) {
    // query params: ?key1=value1&key2=value2
    // Lưu lại url hiện tại vào query param là redirectUrl để sau khi signin thành công chuyển user về lại url hiện tại
    const url = `/?redirectUrl=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  return children;
};

export default UserProtected;