import Layout from "@/components/general/Layout";
import React from "react";
import TopMusic from "@/components/player/TopMusic";
import TopArtist from "@/components/player/DisplayArtist";
import NewReleases from "@/components/player/NewReleases";

import styles from "@/styles/player/PlayerPage.module.css";
import { useRouter } from "next/router";

function Player() {
  const router = useRouter();
  const { search } = router.query;


  return (
    <Layout
      childern={
        <div className={styles.container}>
          <TopMusic />
          <TopArtist 
            title="Artists on Rise"
          />
          <NewReleases />
        </div>
      }
    />
  );
}

export default Player;
