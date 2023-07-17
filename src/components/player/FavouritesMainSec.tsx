import React from "react";
import Image from "next/image";
import { Title, Button, Text, Skeleton } from "@mantine/core";
import MusicComponent from "@/components/player/MusicComponent";
import Shuffle from "@/assets/player/favourites/Shuffle.svg";

import styles from "./FavouritesMainSec.module.css";
import { ISong } from "@/interfaces/ISong";

function FavouritesTopSec({
  songs,
  isLoading,
}: {
  songs: ISong[];
  isLoading: boolean;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.authorProfileInfo}>
        <Title order={2} weight={"800"}>
          Your Favorites
        </Title>
        <div className={styles.authorProfileInfoNFT}>
          <Button
            color="secondary"
            variant="filled"
            size="md"
            radius={"xl"}
            rightIcon={<Image src={Shuffle} height={20} width={20} alt="" />}
          >
            Shuffle All
          </Button>
          <Text>{songs?.length} Songs</Text>
        </div>
      </div>
      <div className={styles.songs}>
        <Title order={5}>Songs</Title>
        <div className={styles.songsList}>
          {isLoading ? (
            <Skeleton height={20} />
          ) : (
            songs.map((song) => (
              <MusicComponent song={song} key={song.id} showFull />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FavouritesTopSec;
