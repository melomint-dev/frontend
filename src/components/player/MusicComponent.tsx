import { useContext } from "react";
import styles from "./MusicComponent.module.css";
import Image from "next/image";
import { Text } from "@mantine/core";
import { MusicContext } from "@/context/MusicContext";
import API_CONSTANTS from "@/utils/apiConstants";
import { ISong } from "@/interfaces/ISong";
import { useUser } from "@/hooks/person.swr";

const MusicComponent = ({
  song,
  showFull = false,
}: {
  song: ISong;
  showFull?: boolean;
}) => {
  const { userData, isUserDataLoading, errorFetchingUserData } = useUser();

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
    const cURL =
      "https://melomint-infra.centralindia.cloudapp.azure.com/api/get-file/";
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
      setCoverPhotoSrc(song.img);
    }
  };
  return (
    <div
      className={styles.container}
      onClick={() =>
        changeSong({ hash: "QmdztfvDRgVaUUs5SoHM4HNnsy8t9A1xmtN1k8Ky9XYC8r" })
      }
    >
      <Image
        src={API_CONSTANTS.IPFS_BASE_URL + song.img}
        height={56}
        width={56}
        alt=""
        className={styles.musicImage}
      />
      <div>
        <Text weight={700} color="primary">
          {song.name}
        </Text>
        <Text size="sm" weight={500} color="primary.3">
          {song.artist.firstName + " " + song.artist.lastName}
        </Text>
      </div>
      {showFull && (
        <Text size="sm" weight={400} color="primary.3">
          {new Date((song.duration ?? 0) * 1000).toISOString().substr(14, 5)}
        </Text>
      )}
    </div>
  );
};

export default MusicComponent;
