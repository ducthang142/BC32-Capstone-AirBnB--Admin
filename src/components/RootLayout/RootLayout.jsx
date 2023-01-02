import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Flex } from "@mantine/core";

const RootLayout = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Flex>
        <Navbar />
        <Outlet />
      </Flex>
    </div>
  );
};

export default RootLayout;
