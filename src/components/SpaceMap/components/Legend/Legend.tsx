import React from "react";

import { TypeColorEnum, TypeEnum } from "@/enums";

import styles from "./Legend.module.css";

export const Legend = () => {
  return (
    <div className={styles.legendContainer}>
      {(Object.keys(TypeEnum) as Array<keyof typeof TypeEnum>).map((item) => (
        <p key={item} className={styles.legendText}>
          <span className="inline-flex">
            <span
              className={styles.circle}
              style={{ backgroundColor: TypeColorEnum[item] }}
            />

            {item.replaceAll("_", " ")}
          </span>
        </p>
      ))}
    </div>
  );
};
