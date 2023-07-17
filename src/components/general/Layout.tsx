import { useContext } from "react";
import Sidebar from "@/components/general/Sidebar";
import Header from "@/components/general/Header";
import BottomBar from "@/components/general/BottomBar";
import { MusicContext } from "@/context/MusicContext";

import styles from "@/components/general/Layout.module.css";

function Layout({ childern }: { childern: React.ReactNode }) {
  const { audioURL } = useContext(MusicContext);
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Sidebar />
        <div className={styles.rightContainer}>
          <Header />
          {childern}
        </div>
      </div>
      {audioURL !== "" && <BottomBar /> }
    </div>
  );
}

export default Layout;
