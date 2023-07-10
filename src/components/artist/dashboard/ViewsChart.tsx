import React from "react";
import { Title, Select } from "@mantine/core";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
  Legend,
} from "recharts";

import styles from "./ViewsChart.module.css";

const TIME_SELECTION_OPTIONS = [
  {
    label: "Last 24 Hours",
    value: "last24Hours",
  },
  {
    label: "Last 7 Days",
    value: "last7Days",
  },
  {
    label: "Last 30 Days",
    value: "last30Days",
  },
  {
    label: "All Time",
    value: "allTime",
  },
];

const TMP_CHART_DATA = new Array(30).fill(0).map((_, index) => ({
  lable: index + 1,
  views: ((index + 1) * 471) % 368,
}));

function ViewsChart() {
  const [timeSelection, setTimeSelection] = React.useState<string>(
    TIME_SELECTION_OPTIONS[0].value
  );
  const [chartData, setChartData] = React.useState(TMP_CHART_DATA);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title order={3} weight={800} color="primary">
          Views
        </Title>
        <Select
          placeholder="Time Selection"
          data={TIME_SELECTION_OPTIONS}
          color="primary"
          size="md"
          value={timeSelection}
          onChange={(value) => {
            setTimeSelection(value || "");
          }}
        />
      </div>
      <div className={styles.analytics}>
        <AreaChart width={650} height={251} data={chartData}>
          <Area
            type="monotone"
            dataKey="views"
            stroke="#0f89f9"
            fill="#0E9CFF22"
            strokeWidth={2}
          />
          <CartesianGrid
            stroke="#eee"
            strokeDasharray="3 3"
            strokeDashoffset={15}
          />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
        </AreaChart>
      </div>
    </div>
  );
}

export default ViewsChart;
