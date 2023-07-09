import Layout from "@/components/general/Layout";
import React from "react";
import TopMusic from "@/components/player/TopMusic";
import TopArtist from "@/components/player/TopArtist";
import NewReleases from "@/components/player/NewReleases";

import styles from "@/styles/player/PlayerPage.module.css";

function Player() {
  return (
    <Layout
      childern={
        <div className={styles.container}>
          <TopMusic />
          <TopArtist />
          <NewReleases />
        </div>
      }
    />
  );
}

export default Player;
