import React from "react";

import styles from "./AgentHeaderItem.module.css";

interface AgentHeaderItemProps {
  label: string;
  value: string;
}

export const AgentHeaderItem = ({ label, value }: AgentHeaderItemProps) => (
  <div className={styles.wrapper}>
    <span className={styles.title}>{label}</span>
    <span className={styles.value}>{value}</span>
  </div>
);
