import Layout from "@/components/artist/Layout";
import { Title } from "@mantine/core";
import ViewsChart from "@/components/artist/dashboard/ViewsChart";

import styles from "@/styles/artist/Dashboard.module.css";
import QuickStats from "@/components/artist/dashboard/QuickStats";

const Artist = () => {
  return (
    <Layout
      childern={
        <div className={styles.container}>
          <Title order={1} weight={800} color="primary">
            Dashboard
          </Title>
          <ViewsChart />
          <QuickStats />
        </div>
      }
    />
  );
};

export default Artist;
