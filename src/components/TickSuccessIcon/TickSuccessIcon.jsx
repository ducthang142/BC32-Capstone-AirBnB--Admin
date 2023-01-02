import React from "react";
import styles from './TickSuccessIcon.module.scss'

const TickSuccessIcon = () => {
  return (
    <>
      <div className={styles.animation__ctn}>
        <div className={`${styles.icon} ${styles.icon__ordered__success} ${styles.svg}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
            <g fill="none" stroke="#e64980" strokeWidth={2}>
              <circle
                cx={77}
                cy={77}
                r={72}
                style={{
                  strokeDasharray: "480px, 480px",
                  strokeDashoffset: 960,
                }}
              />
              <circle
                id="colored"
                fill="#e64980"
                cx={77}
                cy={77}
                r={72}
                style={{
                  strokeDasharray: "480px, 480px",
                  strokeDashoffset: 960,
                }}
              />
              <polyline
                className="st0"
                stroke="#fff"
                strokeWidth={10}
                points="43.5,77.8 63.7,97.9 112.2,49.4 "
                style={{
                  strokeDasharray: "100px, 100px",
                  strokeDashoffset: 200,
                }}
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default TickSuccessIcon;
