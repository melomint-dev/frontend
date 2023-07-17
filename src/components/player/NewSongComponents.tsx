import {useContext} from "react";
import styles from "./NewSongComponents.module.css";

import Image, { StaticImageData } from "next/image";
import { Text } from "@mantine/core";
import { MusicContext } from "@/context/MusicContext";

const NewSongComponents = ({
  song,
}: {
  song: {
    _id: string;
    name: string;
    image: string;
    artist: string;
  };
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
    <div className={styles.container} onClick={() => changeSong({hash: "QmdztfvDRgVaUUs5SoHM4HNnsy8t9A1xmtN1k8Ky9XYC8r"})}>
      <Image src={song.image} alt="" className={styles.songImage} width={300} height={300}/>
      <Text
        weight={700}
        color="primary"
        lineClamp={1}
        className={styles.songName}
      >
        {song.name}
      </Text>
      <Text weight={700} color="primary.3" className={styles.songArtistName}>
        {song.artist}
      </Text>
    </div>
  );
};

export default NewSongComponents;
