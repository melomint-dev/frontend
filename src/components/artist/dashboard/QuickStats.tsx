import React from "react";
import { Title, Text } from "@mantine/core";

import styles from "./QuickStats.module.css";

const intToString = (num: any) => {
  num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
};

function QuickStats() {
  const stats = [
    {
      label: "Total Views",
      value: 5000000,
    },
    {
      label: "NFT Members",
      value: 158,
    },
    {
      label: "Estimated Revenue",
      value: 4000,
    },
    {
      label: "Similarities found in ",
      value: "8 Songs",
    },
    {
      label: "Revenue from Royalties",
      value: 150,
    },
  ];

  return (
    <div className={styles.container}>
      <Title order={3} weight={800} color="primary">
        Quick Stats
      </Title>
      <div className={styles.stats}>
        {stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <Text weight="600" size="lg" color="primary.3">
              {stat.label}
            </Text>
            <Text size={28} weight="800" color="secondary">
              {typeof stat.value === "number"
                ? intToString(stat.value) + "+"
                : stat.value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickStats;
