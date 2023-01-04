import React from "react";
import styles from './Loading.module.scss';
import { Image } from "@mantine/core";

const Loading = () => {
  return (
    <>
      <div class={styles.container}>
        <svg
          class={styles.loader}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 340 340"
        >
          <circle cx="170" cy="170" r="160" stroke="#e64980" />
          <circle cx="170" cy="170" r="135" stroke="#fff" />
          <circle cx="170" cy="170" r="110" stroke="#e64980" />
          <circle cx="170" cy="170" r="85" stroke="#fff" />
        </svg>
        <Image src="/image/tama-logo-nbg.png" alt="logo-ngb" className={styles.logo} width={150}/>
      </div>
    </>
  );
};

export default Loading;
