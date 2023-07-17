import {useContext} from "react";
import styles from "./MusicComponent.module.css";
import Image from "next/image";
import { Text } from "@mantine/core";
import { MusicContext } from "@/context/MusicContext";

const MusicComponent = ({
  song,
  showFull = false,
}: {
  song: {
    _id: string;
    name: string;
    artist: string;
    image: string;
    duration: number;
  };
  showFull?: boolean;
}) => {
  interface HashObject {
    [key: string]: string;
  }
  const { audioURL, setAudioUrl, setArtistName, setCoverPhotoSrc, setMusicName } = useContext(MusicContext);
  const changeSong = (ipfsHash:HashObject) => {
    const cURL = "https://melomint-infra.centralindia.cloudapp.azure.com/api/get-file/";
    const { hash } = ipfsHash;
    console.log(hash);
    if(audioURL !== (cURL+hash)){
      setAudioUrl(cURL+hash);
      setMusicName(song.name);
      setArtistName(song.artist);
      setCoverPhotoSrc(song.image);
    }
  } 
  return (
    <div className={styles.container} onClick={()=>changeSong({hash: "QmdztfvDRgVaUUs5SoHM4HNnsy8t9A1xmtN1k8Ky9XYC8r"})}>
      <Image
        src={song.image}
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
          {song.artist}
        </Text>
      </div>
      {showFull && (
        <Text size="sm" weight={400} color="primary.3">
          {new Date(song.duration * 1000).toISOString().substr(14, 5)}
        </Text>
      )}
    </div>
  );
};

export default MusicComponent;
