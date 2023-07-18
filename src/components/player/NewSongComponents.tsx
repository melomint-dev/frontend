import { useContext, useState } from "react";
import styles from "./NewSongComponents.module.css";

import Image, { StaticImageData } from "next/image";
import { LoadingOverlay, Text } from "@mantine/core";
import { MusicContext } from "@/context/MusicContext";
import API_CONSTANTS from "@/utils/apiConstants";
import { ISong } from "@/interfaces/ISong";
import { useUser } from "@/hooks/person.swr";

const NewSongComponents = ({ song }: { song: ISong }) => {
  const { userData } = useUser();
  const [isLoadingSong, setIsLoadingSong] = useState(false);

  interface HashObject {
    [key: string]: string;
  }
  const {
    audioURL,
    setAudioUrl,
    setArtistName,
    setCoverPhotoSrc,
    setMusicName,
  } = useContext(MusicContext);
  const changeSong = (ipfsHash: HashObject) => {
    setIsLoadingSong(true);

    const { hash } = ipfsHash;
    console.log(hash);
    const audioURLMeta = {
      songId: song.id,
      artistId: song.artist.id,
      userId: userData.id,
    };
    if (audioURL !== JSON.stringify(audioURLMeta)) {
      setAudioUrl(JSON.stringify(audioURLMeta));
      setMusicName(song.name);
      setArtistName(song.artist.firstName + " " + song.artist.lastName);
      setCoverPhotoSrc(API_CONSTANTS.IPFS_BASE_URL + song.img);
    }
    setIsLoadingSong(false);
  };
  return (
    <div
      className={styles.container}
      onClick={() =>
        changeSong({ hash: "QmdztfvDRgVaUUs5SoHM4HNnsy8t9A1xmtN1k8Ky9XYC8r" })
      }
    >
      <LoadingOverlay
        loaderProps={{
          variant: "bars",
        }}
        visible={isLoadingSong}
        overlayBlur={2}
      />
      <Image
        src={API_CONSTANTS.IPFS_BASE_URL + song.img}
        alt=""
        className={styles.songImage}
        width={300}
        height={300}
      />
      <Text
        weight={700}
        color="primary"
        lineClamp={1}
        className={styles.songName}
      >
        {song.name}
      </Text>
      <Text weight={700} color="primary.3" className={styles.songArtistName}>
        {song.artist.firstName + " " + song.artist.lastName}
      </Text>
    </div>
  );
};

export default NewSongComponents;
