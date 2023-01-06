import React from "react";
import { Text } from "@mantine/core";
import styles from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}></div>
      <div className={`${styles.overlay} text-center`}>
       
          <Text className={styles.t1} color="white">
            404 :(
          </Text>
        
          <Text className={styles.t2} color="white">
            KHÔNG TÌM THẤY TRANG
          </Text>
          <Text className={styles.t3} color="white" mt={32}>
            Trang đã bị xóa hoặc địa chỉ url không đúng!
          </Text>
          <Text className={styles.t3} color="white">
            Trở về <span onClick={()=>navigate("./")}>Trang Chủ</span> 
          </Text>
        
      </div>
    </>
  );
};

export default NotFound;
