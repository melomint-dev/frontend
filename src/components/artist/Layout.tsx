import React from "react";

import Sidebar from "@/components/general/Sidebar";
import Header from "@/components/general/Header";
import BottomBar from "@/components/general/BottomBar";

import styles from "@/components/general/Layout.module.css";

function Layout({ childern }: { childern: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Sidebar />
        <div className={styles.rightContainer}>
          {childern}
        </div>
      </div>
    </div>
  );
}

export default Layout;
